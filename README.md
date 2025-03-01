# Welcome to Album Chart Creator 🤘

Create stunning album charts effortlessly! Simply input your top 100 music albums, and Album Chart Creator will automatically extract dominant colors from each album cover to generate visually striking album cards. Export your charts as PDFs and showcase your top picks in style!

Built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Getting started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AlexanderRoth98/Album-Chart-Creator.git

   ```

2. **Install dependencies:**

   ```bash
   npm i

   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

## Database Description

User input is saved in the browser cache to provide a seamless and personalized experience. However, for initial album picks, users can load predefined selections from a MongoDB database hosted in the cloud.

### Using MongoDB

To access the MongoDB data, you'll need credentials. If you're interested in exploring this feature, please contact me to get the required credentials.

### Setting Up Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
DB_USER=user
DB_PASS=password
DB_CLUSTER=cluster
```
