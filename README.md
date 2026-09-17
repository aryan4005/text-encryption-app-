## 📦 Repository Setup Flow

Follow these steps to set up CRYPTX on your computer and publish it to GitHub.

### 1. Create the Project Folder

```text
caesar-cipher-app/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### 2. Clone the Repository

If the repository already exists on GitHub:

```bash
git clone https://github.com/YOUR-USERNAME/caesar-cipher-app.git
```

Move into the project:

```bash
cd caesar-cipher-app
```

### 3. Run the Application

CRYPTX does not require Node.js, PHP, MySQL, or any backend server.

Simply open:

```text
index.html
```

in Google Chrome.

### 4. Test the Application

Try the following:

```text
Message: HELLO WORLD
Shift:   3
Mode:    ENCRYPT
```

Expected output:

```text
KHOOR ZRUOG
```

Then switch to **DECRYPT**, use shift `3`, and verify that the original message is restored.

### 5. Initialize Git

If you created the project locally instead of cloning it:

```bash
git init
```

Add the project files:

```bash
git add .
```

Create the first commit:

```bash
git commit -m "Initial commit - Caesar Cipher cybersecurity app"
```

### 6. Connect to GitHub

Create a new repository on GitHub named:

```text
caesar-cipher-app
```

Then connect your local project:

```bash
git remote add origin https://github.com/YOUR-USERNAME/caesar-cipher-app.git
```

Rename the branch to `main`:

```bash
git branch -M main
```

### 7. Push the Project

```bash
git push -u origin main
```

Your repository should now contain:

```text
caesar-cipher-app
│
├── 📄 index.html
├── 🎨 style.css
├── ⚙️ script.js
└── 📖 README.md
```

### 8. Enable GitHub Pages

To make the application accessible online:

1. Open your GitHub repository.
2. Go to **Settings**.
3. Select **Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch.
6. Select `/ (root)`.
7. Click **Save**.

After deployment, GitHub will provide a public URL similar to:

```text
https://YOUR-USERNAME.github.io/caesar-cipher-app/
```

Add that URL to the **Live Demo** section at the top of this README.

### 🔄 Updating the Project

Whenever you make changes:

```bash
git add .
git commit -m "Update Caesar Cipher application"
git push
```

GitHub Pages will automatically update the deployed application.

### 🗂️ Recommended GitHub Repository

**Repository name:**

```text
caesar-cipher-app
```

**Description:**

```text
A cybersecurity-focused Caesar Cipher encryption and decryption web app built with HTML, CSS and JavaScript.
```

**Suggested topics:**

```text
cybersecurity
cryptography
caesar-cipher
encryption
javascript
html
css
web-security
cybersecurity-project
portfolio-project
```
