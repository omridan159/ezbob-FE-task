# Interview Assignment

## Project Overview

This project implements a search engine client with the following features:

1. Search Input:
   -  Supports typing queries and auto-completion.
   -  Displays matching results dynamically from a local database.
2. Search History:
   -  Tracks recently searched items.
   -  Allows users to remove history items.
3. Results Display:
   -  Lists all matching items with metadata, including the number of results and search duration.

## Repository Structure

```
interview-h.w/
├── frontend/     # React frontend application
└── backend/      # Node.js backend service
```

## Getting Started

To run the complete application, you'll need to set up and run both the backend and frontend services. Please follow the README instructions in each directory:

1. First, set up and run the backend service:

   -  Navigate to the [backend README](./backend/README.md) for detailed setup instructions
   -  The backend service must be running before starting the frontend

2. Then, set up and run the frontend application:
   -  Navigate to the [frontend README](./frontend/README.md) for detailed setup instructions
   -  The frontend will connect to the running backend service
