"use client";
import { gql, useQuery } from "@apollo/client";
import Image from "next/image";

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(`data: ${JSON.stringify(data)}`);

  return (
    <div className="flex h-full flex-col justify-center2 items-center">
      <h1 className="text-4xl mb-5 font-bold">Home</h1>
      <span className="text-7xl">🏡</span>
    </div>
  );
}
