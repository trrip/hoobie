import {
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
// import { createClient } from '@supabase/supabase-js';

// const service_role = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZ2JleHh1b2R5enRjeXBxaHVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU3NDc1MzEsImV4cCI6MjAwMTMyMzUzMX0.Tf-ezTyH3GDFQE-EuOJptcJJSa6B1FrnVbQDrgJ6_JA"

// const superbase = createClient('https://ylgbexxuodyztcypqhua.supabase.co', service_role)

export default component$(() => {
  const userName = useSignal("");
  const password = useSignal("");
  const isSignedIn = useSignal<boolean>(true);
  const byNuym = useSignal("1");
  const loginServer = useResource$<string>(async ({ track }) => {
    // it will run first on mount (server), then re-run whenever prNumber changes (client)
    // this means this code will run on the server and the browser
    track(() => isSignedIn.value);

    console.log("asdasda1");
    if (!isSignedIn.value) {
      console.log("asdasda");
      return "asdasd";
    }
    console.log("running the code now");
    const response = await fetch(
      `https://api.github.com/repos/BuilderIO/qwik/pulls/${byNuym.value}`
    );
    const data = await response.json();
    return data.title as string;
  });
  const res = (
    <Resource
      value={loginServer}
      onPending={() => <p>Loading...</p>}
      onResolved={(title) => <h2>{title}</h2>}
      onRejected={() => <p>error happened</p>}
    />
  );
  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        UserName : <input type="email" bind:value={userName} />
        password : <input type="password" bind:value={password} />
        {isSignedIn.value ? <h1>Visible</h1> : <h1>Hidden</h1>}
        <button onClick$={() => (isSignedIn.value = !isSignedIn.value)}>
          Toggle
        </button>
        {isSignedIn.value && res}
        Happy coding. {userName.value} :: {password.value}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
// const SUPABASE_KEY = 'SUPABASE_CLIENT_API_KEY'

// const jwtsecret = "b5ySOfvZidXk8qFy2CBktdqEgGCouNZN8yVlaBRPZgbwAX24E1kA6D2pTHhQCzyBNvwN+Z5FG7vhI4gOYMm4Eg=="
// const SUPABASE_URL = "https://ylgbexxuodyztcypqhua.supabase.co"

// const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_KEY);

// https://ylgbexxuodyztcypqhua.supabase.co/auth/v1/callback
