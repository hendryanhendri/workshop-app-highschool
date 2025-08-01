# workshop-app-highschool
Just for workshop purpose

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Live Demo

You can access the deployed app here:  
[https://workshop-app-highschool.vercel.app/](https://workshop-app-highschool.vercel.app/)

## Prerequisites

Before you begin, you'll need to install the following software on your machine:

### For Windows:

1. **Install Node.js**
   - Visit [Node.js official website](https://nodejs.org/)
   - Download the LTS version (recommended)
   - Run the installer and follow the setup wizard
   - Verify installation by opening Command Prompt and running:
     ```cmd
     node --version
     npm --version
     ```

2. **Install Git**
   - Visit [Git for Windows](https://git-scm.com/download/win)
   - Download and run the installer
   - During installation, select "Git Bash Here" option
   - Verify installation by opening Command Prompt or Git Bash and running:
     ```cmd
     git --version
     ```

3. **Install a Code Editor (Optional but Recommended)**
   - [Visual Studio Code](https://code.visualstudio.com/)
   - [Sublime Text](https://www.sublimetext.com/)
   - [Atom](https://atom.io/)

### For Mac:

1. **Install Node.js**
   - **Option 1: Direct Download**
     - Visit [Node.js official website](https://nodejs.org/)
     - Download the LTS version (recommended)
     - Run the .pkg installer
   - **Option 2: Using Homebrew (Recommended)**
     ```bash
     # Install Homebrew first if you don't have it
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     
     # Install Node.js
     brew install node
     ```
   - Verify installation by opening Terminal and running:
     ```bash
     node --version
     npm --version
     ```

2. **Install Git**
   - **Option 1: Using Homebrew (Recommended)**
     ```bash
     brew install git
     ```
   - **Option 2: Direct Download**
     - Visit [Git official website](https://git-scm.com/download/mac)
     - Download and run the installer
   - **Option 3: Xcode Command Line Tools**
     ```bash
     xcode-select --install
     ```
   - Verify installation by running:
     ```bash
     git --version
     ```

3. **Install a Code Editor (Optional but Recommended)**
   - [Visual Studio Code](https://code.visualstudio.com/)
   - [Sublime Text](https://www.sublimetext.com/)
   - [Atom](https://atom.io/)

## Git Configuration

After installing Git, configure it with your personal information:

```bash
# Set your name
git config --global user.name "Your Full Name"

# Set your email
git config --global user.email "your.email@example.com"

# Set default branch name to main (optional but recommended)
git config --global init.defaultBranch main

# Verify your configuration
git config --list
```

## Project Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/hendryanhendri/workshop-app-highschool.git
   cd workshop-app-highschool
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Check for updates
npm outdated

# Update packages
npm update
```

## Troubleshooting

### Common Issues:

1. **Node.js version compatibility**
   - This project requires Node.js 18.17 or later
   - Check your version: `node --version`
   - If you need to update, download the latest LTS from [nodejs.org](https://nodejs.org/)

2. **Port already in use**
   - If port 3000 is busy, Next.js will automatically use the next available port
   - You can also specify a different port: `npm run dev -- -p 3001`

3. **Permission errors on Mac/Linux**
   - If you get permission errors, you might need to fix npm permissions:
     ```bash
     sudo chown -R $(whoami) ~/.npm
     ```

4. **Git authentication issues**
   - For HTTPS: Use your GitHub username and personal access token
   - For SSH: Set up SSH keys in your GitHub account
   - [GitHub authentication guide](https://docs.github.com/en/authentication)

### Getting Help:

- [Next.js Documentation](https://nextjs.org/docs)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Git Documentation](https://git-scm.com/doc)
- [npm Documentation](https://docs.npmjs.com/)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## UI Kit Recommendations

Choose a UI kit that fits your project needs and skill level:

### 🎨 **Recommended UI Kits for Next.js**

#### **1. Shadcn/ui (Highly Recommended)**
- **Best for**: Modern, customizable components
- **Pros**: Copy-paste components, full customization, TypeScript support, built with Radix UI
- **Installation**:
  ```bash
  npx shadcn@latest init
  npx shadcn@latest add button card input
  ```
- **Website**: [ui.shadcn.com](https://ui.shadcn.com/)

#### **2. NextUI (Great for Beginners)**
- **Best for**: Beautiful default styling, quick development
- **Pros**: Modern design, built-in dark mode, TypeScript support
- **Installation**:
  ```bash
  npm install @nextui-org/react framer-motion
  ```
- **Website**: [nextui.org](https://nextui.org/)

#### **3. Chakra UI**
- **Best for**: Accessibility-first, comprehensive component library
- **Pros**: Excellent accessibility, theming system, extensive documentation
- **Installation**:
  ```bash
  npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
  ```
- **Website**: [chakra-ui.com](https://chakra-ui.com/)

#### **4. Mantine**
- **Best for**: Feature-rich applications, data-heavy interfaces
- **Pros**: Extensive components, hooks, utilities, built-in form validation
- **Installation**:
  ```bash
  npm install @mantine/core @mantine/hooks @mantine/next @emotion/react @emotion/server
  ```
- **Website**: [mantine.dev](https://mantine.dev/)

#### **5. Headless UI + Tailwind CSS (Current Setup Compatible)**
- **Best for**: Full control over styling, works perfectly with your Tailwind setup
- **Pros**: Unstyled, accessible components that you can style with Tailwind
- **Installation**:
  ```bash
  npm install @headlessui/react @heroicons/react
  ```
- **Website**: [headlessui.com](https://headlessui.com/)

### 🛠 **Quick Setup Guides**

#### **Option A: Shadcn/ui (Recommended for this project)**
```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Add common components
npx shadcn@latest add button card input label textarea select
```

#### **Option B: NextUI (Easy to use)**
```bash
# Install NextUI
npm install @nextui-org/react framer-motion

# Add to your tailwind.config.js
# (NextUI provides detailed setup instructions)
```

#### **Option C: Headless UI (Tailwind Compatible)**
```bash
# Install Headless UI and Heroicons
npm install @headlessui/react @heroicons/react

# Start using components immediately with your existing Tailwind setup
```

### 📦 **Component Examples**

After choosing a UI kit, you can create components like:

- **Buttons**: Primary, secondary, outline variants
- **Forms**: Input fields, textareas, selects, checkboxes
- **Navigation**: Navbar, sidebar, breadcrumbs
- **Feedback**: Alerts, toasts, modals
- **Data Display**: Cards, tables, lists
- **Layout**: Grid systems, containers, spacers



