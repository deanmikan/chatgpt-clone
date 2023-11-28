# ChatGPT Clone with NextJS and Supabase

This project is a personal code challenge attempting to clone ChatGPT. The project is built using NextJS, and Supabase, an open-source Firebase alternative.

## Status

🚧 This is a work in progress and is not yet complete 🚧

### Todo
- Optimistic rendering (don't have to wait for DB to update before updating UI).
- Database tables have no RLS (Row Level Security) set up yet.
- Shareable converations.
- Edit messages and create message threads.
- Refactor pages/components to be SSR where possible.
- Use Framer Motion for pretty animations.
- General code clean up.

## Project Structure

The project is structured as follows:

- `app/`: Contains the main application logic and page-specific components.
- `components/`: Contains reusable components.
- `providers/`: Contains context providers.
- `hooks/`: Contains custom React hooks.
- `store/`: Contains the application state management logic.

## Hosting

The application is hosted on Vercel, a cloud platform for static sites and Serverless Functions.

## Running the Project Locally

P.s Currently, I have not share the migration files for the database schema. So this cannot be run locally.

Nonetheless, to run the project locally, follow these steps:

1. Clone the repository.
2. Install the dependencies with `bun i`
3. Start the development server with `bun dev`

Please note that you will need to set up your own Supabase project and provide the necessary environment variables for the project to function correctly.

```.env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Contributing

This project is a personal code challenge and is not currently accepting contributions. However, you're welcome to fork the project and make your own modifications.

Please note that this is a personal project and is not affiliated with OpenAI in any way.

## License

This project is licensed under the MIT License.