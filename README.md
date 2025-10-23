# revalidateTag vs. updateTag

A minimal Next.js (App Router) project demonstrating the difference between two cache invalidation APIs: `revalidateTag` and `updateTag`.

## How It Works

This demo displays a server-rendered time that is cached. Two buttons trigger Server Actions to invalidate this cache, and you can observe the different outcomes.

- **Click `revalidateTag()`**

  - Marks the cache tag as stale (**stale-while-revalidate**).
  - The first page refresh after clicking will still show the old cached time while triggering a revalidation in the background.
  - **A second refresh is required** to see the updated time.
  - [Documentation Reference](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)

- **Click `updateTag()`**
  - Immediately invalidates and updates the cache.
  - The UI updates instantly after the action completes, **without a manual reload**. This is ideal for "read-your-own-writes" scenarios.
  - [Documentation Reference](https://nextjs.org/docs/app/api-reference/functions/updateTag)

## Observing Server Logs

The clearest way to see the caching behavior is by watching the terminal where your development server is running (`bun dev`). Clicking either button sends a `POST` request (the Server Action).

```bash
GET / 200 in 5.4s (compile: 4.5s, render: 884ms)  # Initial page load (caches the time)
POST / 200 in 32ms (compile: 8ms, render: 24ms)   # POST request from a button click
GET / 200 in 354ms (compile: 8ms, render: 346ms)  # GET request from a manual page refresh
```

- **`revalidateTag`**: The `POST` request marks the cache tag as stale. The next `GET` request (your first refresh) serves the stale data while starting a background refetch. A subsequent `GET` (your second refresh) will finally serve the fresh data.
- **`updateTag`**: The `POST` request immediately revalidates the data and updates the cache. The UI then refetches and displays the new time automatically, often without a new `GET` request in the logs unless the page is manually reloaded.

## How to Run

1.  `bun install`
2.  `bun dev`
3.  Open your browser and click the buttons to observe the different caching behaviors in the UI and your terminal.

## Key Files

- **`src/components/Time.tsx`**: Caches the timestamp data using `cache` and `cacheTag`.
- **`src/server.ts`**: Defines the Server Actions that call `revalidateTag` and `updateTag`.
- **`src/components/Actions.tsx`**: Renders the UI buttons that invoke the Server Actions.
