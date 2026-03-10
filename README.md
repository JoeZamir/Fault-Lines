# Fault Lines — Cast & Producer Navigation Guide

This guide explains how to run and navigate the **Fault Lines desktop simulation** so non-technical reviewers can quickly walk through the experience.

---

## What this app is

prod url: https://faultlinesos.netlify.app/

Fault Lines is an interactive **Linux-style desktop simulation** ("Penguin OS") used to present story evidence and decryption workflows through three different user accounts:

- **Joseph** (encryption workflow)
- **Titus** (locked archive exploration)
- **Naomi** (analysis + decryption + evidence review)

Each account has shared desktop components (taskbar, start menu, core apps), plus role-specific tools.
This project is a desktop-only design, does not have mobile view.

---

## Quick Start (local run)

1. Open a terminal in the project folder.
2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm run dev
```

4. Open the displayed URL (typically `http://localhost:5173/`).

---

## Login & Logout

### Sign in
At launch, you will see a login screen.

Use one of these credentials:

- **Joseph** / `joseph`
- **Titus** / `titus`
- **Naomi** / `naomi`

### Sign out
Use the desktop start menu/session controls (taskbar area) to return to login when switching users.

---

## Shared Desktop Navigation (all users)

Across all users, the environment provides:

- A bottom **taskbar** (clock/system area)
- **Start menu** access
- Common desktop apps like:
  - File Explorer
  - My PC
  - Terminal
  - Settings
  - Trash

### File Explorer basics

- **Left sidebar:** quick access shortcuts and drive list
- **Top bar:** back/forward arrows + address path + New button
- **Main panel:** folder/file icons
- **Double-click folders/files** to open

---

## Story Walkthrough by User

## 1) Joseph flow (USB encryption)

Login as **Joseph** to access the **USB Encryption Tool**.

### What to do
1. Open **USB Encryption Tool**.
2. Select a target drive from internal/external lists.
3. Click **Encrypt**.
4. Enter encryption password:
   - `John 8:32`
5. Watch simulated logs + progress completion.

### What this demonstrates
- Split-key style encryption process
- Password-gated encryption action
- Timed log/progress simulation

---

## 2) Titus flow (locked evidence archive)

Login as **Titus** and open **File Explorer**.

### What to do
1. In My PC/drives, open **A: archive_**.
2. Enter drive password:
   - `John 8:32`
3. After unlock, encrypted evidence windows/folders appear automatically in sequence.
4. Browse archive contents, including the `FAULT LINES` folder and nested folders.
5. Open **Drive_2** from desktop:
   - It is password-gated as well (same password interface / credential: `John 8:32`).
   - Encrypted items remain restricted unless unlocked.

### What this demonstrates
- Password-protected archive access
- Sequential auto-opening evidence windows (not all at once)
- Separate encrypted secondary drive behavior

---

## 3) Naomi flow (analysis, decrypt, video evidence)

Login as **Naomi** to access advanced investigation tools.

### Naomi desktop tools
- **USB analyzer**
- **pi_decrypt terminal**
- Shared File Explorer/My PC

### A) USB Analyzer demo
1. Open **USB analyzer**.
2. Click **Analyze**.
3. Review staged analysis logs (encryption hash/type/KEK-style outputs).

### B) Terminal demo (`pi_decrypt` workflow)
Use the terminal commands scripted for the story flow:

- `lsblk`
- `blkinfo /dev/sda1`
- `blkinfo /dev/sda2`
- `pi_decrypt open --keystore /dev/sda2`
  - Enter password when prompted: `John 8:32`
- `pi_decrypt unlock --device /dev/sda1 --dek <DEK>`

This simulates extracting key material and unlocking Drive A.

### C) Naomi File Explorer evidence layout
For Naomi, Drive A presents a dedicated structure:

- `Insurance/_fraud_docs` (PDF/DOC evidence)
- `manipulation/_tapes` (video files)
- `Extortion/_evidence.mp4`

### D) Video evidence behavior
Open `_evidence.mp4` to launch the video UI:

- Linux-like minimal player styling
- Bottom progress/timeline bar
- Play/pause and seek controls
- Simulated **1-minute playback progression**

---

## Important passwords used in the experience

- Drive/encryption password: **`John 8:32`**
- End-of-video challenge password: **`WINNIEBRENDABENJAMIN`**

---

## Recommended demo sequence (for screenings)

If you need a compact, reliable live demo:

1. **Joseph**: show encryption UI + password gate + progress.
2. **Titus**: unlock archive + show staggered auto-open windows + Drive_2 lock.
3. **Naomi**: run analyzer, execute terminal decrypt flow, open Drive A evidence folders, then launch `_evidence.mp4`.

This sequence best communicates escalation from setup → access control → forensic reveal.

---

## Technical stack (for production context)

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn-ui components

