"use server-entry";
import { Layout } from "../../layout/Layout";

export async function AboutPage() {
  return (
    <Layout>
      <p>
        This is a simple Todo app built with React and Parcel. It uses
        server-side rendering to fetch and display tasks.
      </p>
      <p>
        The app allows you to add, complete, and undo tasks. It also provides a
        loading state while tasks are being processed.
      </p>
      <p>
        This app is a demonstration of how to build a simple React app with
        React Server Components using Parcel.
      </p>
    </Layout>
  );
}
