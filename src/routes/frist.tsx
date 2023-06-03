import {
  component$,
  Resource,
  useResource$,
  useSignal,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { createClient } from "@supabase/supabase-js";

const service_role =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZ2JleHh1b2R5enRjeXBxaHVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU3NDc1MzEsImV4cCI6MjAwMTMyMzUzMX0.Tf-ezTyH3GDFQE-EuOJptcJJSa6B1FrnVbQDrgJ6_JA";

const superbase = createClient(
  "https://ylgbexxuodyztcypqhua.supabase.co",
  service_role
);

export default component$(() => {
  const userName = useSignal("");
  const password = useSignal("");
  const isLoggedIn = useSignal(false);
  const newuser = useSignal("1");
  const userInfo = useResource$<string>(async ({ track, cleanup }) => {
    track(() => newuser);
    const controller = new AbortController();
    cleanup(() => controller.abort("ASdas"));

    console.log(`this is fstring ${newuser.value}`);
    if (newuser.value === "4") {
      console.log("we ahave done this ");
      return "jhbjkhbj";
    }

    const { data, error } = await superbase.auth.signInWithPassword({
      email: "choudharynilesh007@gmail.com",
      password: "somepassword",
    });
    // const data = await user.json();
    console.log(data.user);
    console.log(error);
    return data.user?.id as string;
  });

  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        UserName : <input type="email" bind:value={userName} />
        password : <input type="password" bind:value={password} />
        <p>value of the isloggedin is {isLoggedIn.value}</p>
        {isLoggedIn.value ? <h1>Visible</h1> : <h1>Hidden</h1>}
        {isLoggedIn.value ? (
          <Resource
            value={userInfo}
            onPending={() => <p>we are Loading...</p>}
            onResolved={(userInfo) => <p>User Info {userInfo}</p>}
            onRejected={() => <p>errereere</p>}
          />
        ) : (
          // <p>askjdnaksjd</p>
          <p>we dibt want to show something irresposnmdfa</p>
        )}
        <button
          onClick$={() => {
            isLoggedIn.value = !isLoggedIn.value;
            console.log("ASdasdsa");
          }}
        >
          lets in
        </button>
        <br></br>Happy coding :: {userName.value} :: {password.value}.
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
