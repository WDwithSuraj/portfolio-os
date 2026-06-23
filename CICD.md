# CI/CD: auto-deploy to EC2 on every push to `main`

This explains the GitHub Actions setup in `.github/workflows/deploy.yml`.
Once configured, **every push/merge to `main` rebuilds the site and ships it live**
— no more manual `scp`.

## The big picture

```
git push main ──> GitHub runs deploy.yml on a fresh Ubuntu "runner"
                  ├─ npm ci          (install)
                  ├─ npm run build   (make dist/)
                  └─ rsync dist/ ──ssh──> EC2:/var/www/surajos   (live!)
```

The runner is a throwaway stranger's machine, so it needs **3 secrets** to reach
your server. You add these once, in GitHub.

---

## One-time setup

### Step 1 — Let the `ubuntu` user write the web root (run ON the server)

Today you copy files with `sudo`. CI can't type a sudo password, so we make the
deploy directory owned by `ubuntu` so rsync can write to it directly — no sudo.

SSH in as you do now, then run:

```bash
sudo mkdir -p /var/www/surajos
sudo chown -R ubuntu:ubuntu /var/www/surajos
```

(One time only. After this, `ubuntu` owns the folder and rsync just works.)

### Step 2 — Get your SSH private key text (run LOCALLY)

This is the `.pem` you already use to SSH in. We need its full text.

```bash
cat ~/Downloads/aws-learn.pem
```

Copy EVERYTHING it prints, including the
`-----BEGIN ... PRIVATE KEY-----` and `-----END ... PRIVATE KEY-----` lines.

### Step 3 — Add the 3 secrets in GitHub

Go to your repo on github.com →
**Settings → Secrets and variables → Actions → New repository secret**.

Add these three:

| Name          | Value                                        |
|---------------|----------------------------------------------|
| `EC2_SSH_KEY` | the full private key text from Step 2         |
| `EC2_HOST`    | `13.207.151.94`                               |
| `EC2_USER`    | `ubuntu`                                       |

> Secrets are encrypted. Once saved, even you can't read them back — only the
> workflow can use them. They never appear in logs.

---

## Go live

```bash
git add .github/workflows/deploy.yml CICD.md
git commit -m "Add CI/CD: auto-deploy to EC2 on push to main"
git push origin main
```

Now open your repo on github.com → **Actions** tab. You'll see the
"Deploy to EC2" run executing live. Click it to watch each step.
When it goes green ✅, refresh **http://13.207.151.94** — your push is live.

---

## The new workflow from now on

1. Edit code locally, test with `npm run dev`.
2. Commit and push (directly to `main`, or via a Pull Request you merge).
3. GitHub builds + deploys automatically. Done.

The old manual steps in `DEPLOY.md` / `deploy-commands.md` still work as a
fallback, but you shouldn't need them anymore.

---

## Troubleshooting (read the Actions log first — it tells you which step failed)

- **`Permission denied (publickey)`** — `EC2_SSH_KEY` is wrong/incomplete, or that
  key isn't authorized on the box. Re-copy the whole `.pem` including BEGIN/END lines.
- **rsync `Permission denied` writing to /var/www/surajos** — you skipped Step 1
  (the `chown`). SSH in and run it.
- **Build fails** — it failed on the runner the same way it would locally. Run
  `npm ci && npm run build` locally to reproduce and fix.
- **Connection times out** — your EC2 Security Group must allow inbound SSH (port 22).
  Note GitHub runners use changing IPs, so for now port 22 needs to allow `0.0.0.0/0`
  (a later hardening step can lock this down).
