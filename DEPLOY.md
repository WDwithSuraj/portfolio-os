# Deploying SurajOS to AWS EC2 (static + nginx)

This site is a **static build** — `npm run build` produces a `dist/` folder of plain
HTML/CSS/JS. No server-side code, no database, no secrets. We just need a Linux box
running a web server (nginx) that serves those files.

> Goal of this guide: learn the deploy fundamentals. We intentionally skip secret
> management, HTTPS automation, and CI/CD for now — those come later.

---

## 0. Build locally (sanity check)

```bash
npm install
npm run build      # outputs ./dist
npm run preview    # serves ./dist at http://localhost:4173 to confirm it works
```

If `preview` looks right, the same `dist/` will look right on the server.

---

## 1. Launch an EC2 instance

1. AWS Console → **EC2** → **Launch instance**.
2. **AMI:** Ubuntu Server 22.04 LTS (free tier eligible).
3. **Type:** `t2.micro` or `t3.micro` (free tier).
4. **Key pair:** create one, download the `.pem` file, keep it safe.
5. **Network / Security group** — add inbound rules:
   - SSH (port 22) — Source: *My IP* (so only you can SSH).
   - HTTP (port 80) — Source: *Anywhere* (0.0.0.0/0) so visitors can load the site.
6. Launch. Note the instance's **Public IPv4 address** (e.g. `12.34.56.78`).

---

## 2. SSH into the instance

From a terminal (PowerShell/Git Bash) where the `.pem` lives:

```bash
# lock down key permissions (Git Bash / WSL / mac / linux)
chmod 400 surajos-key.pem

ssh -i surajos-key.pem ubuntu@<PUBLIC_IP>
```

---

## 3. Install nginx on the server

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable --now nginx
```

Visit `http://<PUBLIC_IP>` in a browser — you should see the default nginx page.
That confirms the box is serving on port 80.

---

## 4. Get the build onto the server

Pick **one** of these.

### Option A — build locally, copy `dist/` up (simplest)

From your **local** machine:

```bash
npm run build
scp -i surajos-key.pem -r dist/* ubuntu@<PUBLIC_IP>:/tmp/site/
```

Then on the **server**:

```bash
sudo rm -rf /var/www/surajos
sudo mkdir -p /var/www/surajos
sudo cp -r /tmp/site/* /var/www/surajos/
```

### Option B — build on the server (needs Node)

```bash
# on the server
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git
git clone <YOUR_REPO_URL> surajos && cd surajos
npm install && npm run build
sudo rm -rf /var/www/surajos && sudo mkdir -p /var/www/surajos
sudo cp -r dist/* /var/www/surajos/
```

---

## 5. Point nginx at the build

Create the site config on the **server**:

```bash
sudo tee /etc/nginx/sites-available/surajos > /dev/null <<'EOF'
server {
    listen 80;
    server_name _;                       # matches any hostname / the public IP

    root /var/www/surajos;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html; # SPA fallback — important
    }

    # cache static assets aggressively (they are content-hashed by Vite)
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# enable our site, disable the default
sudo ln -sf /etc/nginx/sites-available/surajos /etc/nginx/sites-enabled/surajos
sudo rm -f /etc/nginx/sites-enabled/default

sudo nginx -t          # test config
sudo systemctl reload nginx
```

Open `http://<PUBLIC_IP>` — SurajOS should boot. 🎉

> **Why the `try_files ... /index.html` line?** This is a single-page app. If a future
> route is requested directly, nginx must still hand back `index.html` so the app loads.

---

## 6. Redeploying after changes

```bash
# local
npm run build
scp -i surajos-key.pem -r dist/* ubuntu@<PUBLIC_IP>:/tmp/site/
# server
sudo rm -rf /var/www/surajos/* && sudo cp -r /tmp/site/* /var/www/surajos/
```

(Once this feels routine, we can wrap it in a one-line script, then a GitHub Action.)

---

## Next steps (later, on purpose not now)

- **Domain name** — point a domain's A record at the EC2 public IP (use an Elastic IP
  so it doesn't change on reboot).
- **HTTPS** — free certs via `certbot` + Let's Encrypt once a domain is attached.
- **CI/CD** — GitHub Action that builds and `rsync`s `dist/` on every push to `main`.
- **Secret management** — not needed for a static site; relevant when we add a backend.
```
