# Next SaaS RBAC

## Project Overview

The **Next SaaS RBAC** project is a comprehensive SaaS platform built using modern technologies like Next.js, Node.js, and Fastify. It implements advanced Role-Based Access Control (RBAC) and Attribute-Based Access Control (ABAC) to ensure flexible and secure permission management. The platform is structured as a monorepo, using TurboRepo for efficient build processes, and integrates CASL for permission control and Zod for data validation.

This project is designed to provide a solid foundation for SaaS applications, offering a modular and scalable architecture that can be customized and extended as needed.

### Key Features:

- **Modular Monorepo Structure**: Organizes the project into separate packages and apps for better maintainability and scalability.
- **RBAC & ABAC Implementation**: Utilizes CASL for fine-grained access control, allowing for both role-based and attribute-based permissions.
- **Data Validation with Zod**: Ensures data integrity with comprehensive schema validation.
- **TurboRepo Integration**: Speeds up development and build processes by reusing outputs and avoiding redundant tasks.

## Project Structure

The **Next SaaS RBAC** project is organized into a monorepo structure, utilizing TurboRepo to manage the various packages and apps. Below is an overview of the main components:

### Root Directory

- **`package.json`**: Defines the project scripts and dependencies. This file also specifies the use of workspaces to manage multiple packages and apps within the monorepo.
- **`turbo.json`**: Configuration file for TurboRepo, setting up tasks for building, linting, and development.

### Workspaces

1. **Apps (`apps/`)**: Contains the different applications in the project, such as the Next.js frontend.
2. **Packages (`packages/`)**: Includes reusable modules, such as authentication and RBAC logic.
3. **Config (`config/`)**: Stores shared configuration files for ESLint, Prettier, and TypeScript.

### Configurations

- **`eslint-config/`**: Houses ESLint configuration files tailored for different environments (React, Next.js, Node.js). Ensures consistent code quality across the project.
- **`prettier/`**: Contains Prettier configuration files to enforce consistent code formatting.
- **`ts-config/`**: Stores TypeScript configuration files, customized for different parts of the project, ensuring strict type checking and compatibility.

Each of these components plays a vital role in ensuring the project is well-organized, maintainable, and scalable. The use of workspaces allows for easy management of dependencies and development across multiple packages and apps within the monorepo.

## Authentication and Authorization Module

The **Authentication and Authorization module** within the project is a core component that handles user roles and permissions using RBAC (Role-Based Access Control) and ABAC (Attribute-Based Access Control). It is implemented using `@casl/ability` and `zod` libraries.

### Models

- **`Organization`**: Defines the structure of an organization entity, including `id` and `ownerId`.
- **`Project`**: Represents a project entity with `id` and `ownerId`.
- **`User`**: Contains user information, including `id` and `role`.

### Subjects

Subjects represent the different entities and actions that users can perform within the system. These are defined using Zod schemas:

- **`BillingSubject`**: Actions related to billing, such as `manage`, `get`, and `export`.
- **`InviteSubject`**: Handles invite actions, including `manage`, `get`, `create`, and `delete`.
- **`OrganizationSubject`**: Manages organization-related actions like `create`, `update`, `delete`, and `transfer_ownership`.
- **`ProjectSubject`**: Controls project-related actions, including `get`, `create`, `update`, and `delete`.
- **`UserSubject`**: Manages user-related actions like `get`, `update`, and `delete`.

### Permissions

The permissions are defined in the **`permissions.ts`** file, where different roles have distinct capabilities:

- **ADMIN**: Has the most extensive access, with the ability to `manage` all entities. However, they cannot transfer ownership or update organizations unless they are the owner.
- **MEMBER**: Can view users, manage their projects, and create new ones.
- **BILLING**: Manages billing-related activities.

### Role Definitions

Roles are defined in the **`roles.ts`** file:

- **ADMIN**
- **MEMBER**
- **BILLING**

These roles determine the set of permissions assigned to each user, dictating what actions they can perform within the system.

### Ability Creation

The core functionality for creating and defining abilities is managed in the **`index.ts`** file:

- **`createAppAbility`**: A factory function for creating a MongoAbility instance with the defined abilities.
- **`defineAppAbilityFor`**: A function that defines the abilities for a user based on their role and the permissions defined in the `permissions.ts` file.

This structure ensures a secure and flexible authorization system that can be easily extended or modified as needed.

## Configuration and Setup

The **Configuration and Setup** section provides essential configurations for ESLint, Prettier, TypeScript, and TurboRepo, ensuring a consistent development environment across the project.

### ESLint Configuration

The project uses ESLint configurations for different environments, located in the `config/eslint-config` directory:

- **`library.js`**: Extends the Rocketseat ESLint configuration for React projects and includes the `simple-import-sort` plugin to enforce import sorting.
- **`next.js`**: Applies the Rocketseat ESLint configuration for Next.js projects, also incorporating the `simple-import-sort` plugin.
- **`node.js`**: Configures ESLint for Node.js environments, extending the Rocketseat configuration and using the `simple-import-sort` plugin.

These configurations help maintain code quality and consistency throughout the project.

### Prettier Configuration

The Prettier configuration is located in the `config/prettier` directory:

- **`index.mjs`**: Defines the Prettier settings, including the use of the `prettier-plugin-tailwindcss` plugin. It sets various formatting options such as `printWidth`, `tabWidth`, and `singleQuote`.

This configuration ensures that the codebase adheres to a consistent style, improving readability and maintainability.

### TypeScript Configuration

The TypeScript configuration files are found in the `config/ts-config` directory:

- **`library.json`**: Provides TypeScript settings for libraries, enabling strict mode and modern module resolution.
- **`node.json`**: Configures TypeScript for Node.js environments, ensuring compatibility with ES2023 features and Node.js module resolution.

These settings help maintain type safety and compatibility across different parts of the project.

### TurboRepo Configuration

TurboRepo is used to manage monorepo tasks efficiently. The configuration is found in the `turbo.json` file:

- **`build`**: Defines the build task, specifying dependencies and outputs.
- **`lint`**: Configures the linting task to depend on previous linting steps.
- **`dev`**: Sets up the development task with persistent caching disabled.

TurboRepo helps speed up the development process by reusing cached outputs and managing tasks across multiple packages.

### Root-Level Configuration Files

- **`package.json`**: Defines the project scripts, including `build`, `dev`, and `lint`. It also specifies workspaces for `apps`, `packages`, and `config`.
- **`ts-config.json` in auth package**: Extends the base TypeScript configuration for the authentication package.

These root-level configurations ensure that the project is structured and managed effectively, allowing for smooth development and deployment processes.

## Technologies Used

The **Technologies Used** section provides an overview of the key tools and libraries utilized in the project, ensuring a modern and efficient development process.

### Front-end Technologies

- **Next.js 14**: The front-end framework used in this project, providing powerful features like Server Components and Server Actions for a dynamic user experience.
- **React**: A popular JavaScript library for building user interfaces, ensuring a responsive and interactive front-end.

### Back-end Technologies

- **Node.js**: The JavaScript runtime used for back-end development, allowing for scalable and high-performance server-side applications.
- **Fastify**: A fast and low-overhead web framework for Node.js, ideal for building robust APIs.
- **Prisma**: An ORM (Object-Relational Mapping) tool used for database access, providing a type-safe and efficient way to interact with the database.

### Monorepo Management

- **TurboRepo**: A high-performance monorepo build system that helps speed up development by reusing cached outputs and managing tasks across multiple packages.

### Authentication and Authorization

- **CASL**: A powerful access control library that enables RBAC (Role-Based Access Control) and ABAC (Attribute-Based Access Control) to manage user permissions effectively.
- **Zod**: A TypeScript-first schema declaration and validation library, ensuring data validation and type safety across the project.

### Additional Tools

- **Docker and Docker Compose**: Containerization tools used to create consistent development environments and streamline deployment processes.
- **ESLint**: A static code analysis tool for identifying and fixing issues in JavaScript code, helping to maintain code quality.
- **Prettier**: An opinionated code formatter that enforces a consistent style across the codebase.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, enabling type safety and improved developer productivity.

