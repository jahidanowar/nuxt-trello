# Nuxt Trello SaaS (nrello)

Nuxtrello is a full-stack web application inspired by Trello. This project is built using Nuxt 3, MongoDB, and Tailwind CSS, focusing on creating an efficient, user-friendly task management and organization tool.

## Topics

### Introduction

- Overview
- Project Demo
- Project Data model

### Project Setup

- Installing Nuxt 3
- Adding Required Dependencies
- Connecting to MongoDB
- Creating basic layout

### User Authentication

- Creating User Model
- Creating User API Routes
- Creating User Authentication API Routes
- Creating User Authentication Pages

### Boards Resource

- Creating Board Model
- Creating Board API Routes
- Creating Board Pages
- Creating Image Picker Component

### Lists Resource

- Creating List Model
- Creating List API Routes
- Creating List Pages
- Adding List Editor
- Adding Drag and Drop Functionality

### Card Resource

- Creating Card Model
- Creating Card API Routes
- Creating Card Pages
- Adding Rich Editor
- Adding Drag and Drop Functionality

### SaaS Features

- Modify User Model for SaaS
- Integrate Stripe
- Create essential SaaS API endpoints
- Create `useSubscription` composable
- Design payment modals

### Deployment

- Deploying to Vercel/Netlify/Digital Ocean

<hr>

## Features

- **Drag and Drop Interface**: Easy-to-use, intuitive interface for managing tasks.
- **User Authentication**: Secure user authentication and authorization using JWT.
- **SAAS Features**: Create and manage multiple boards, lists, and tasks in premium plan. SaaS feature is implemented using Stripe.
- **Responsive Design**: Fully responsive web design for a seamless experience across different devices.
- **Advanced Topics**: Covers advanced concepts like state management, API integration, and more.

## Getting Started

### Packages Used

```
bcryptjs stripe vuedraggable@next next-auth@4.21.1 @vueup/vue-quill
```

#### Dev Dependencies

```
@sidebase/nuxt-auth @nuxt/ui @sidebase/nuxt-auth nuxt-server-utils mongoose zod
```

### Prerequisites

- Basic of Javascript
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/jahidanowar/nuxt-trello.git
   ```
2. Navigate to the project directory:
   ```
   cd nuxt-trello
   ```
3. Install dependencies:
   ```
   pnpm install
   ```
4. Start the development server:
   ```
   pnpm run dev
   ```

## Usage

After starting the development server, the application will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please read our contributing guidelines for details on how to submit pull requests to the project.

## Deployment

Vercel deployment is already covered in the video.

For digital ocean deployment, follow the [Digital Ocean Deployment Guide](https://www.youtube.com/watch?v=hANbHC90xug&ab_channel=JahidAnowar).

## Contributions & Issues

Please feel free to raise an issue for suggestions or bugs. You can ,essage me on twitter [@jahidDev](https://twitter.com/jahidDev).

## License

> _The project is released under the WTFPL2 [Do What Ever You Want To Public License](LICENSE)._

<hr>

> [jahid.dev](https://jahid.dev) &nbsp;&middot;&nbsp;
> YouTube [@jahidanowar](https://jahid.dev/go/yt) &nbsp;&middot;&nbsp;
> Twitter [@jahidDev](https://jahid.dev/go/tt) &nbsp;&middot;&nbsp;
> Instagram [@jahidDev](https://jahid.dev/go/ig)
