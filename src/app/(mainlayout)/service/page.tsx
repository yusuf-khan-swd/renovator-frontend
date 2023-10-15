import Link from "next/link";

const page = () => {
  return (
    <div>
      <h1>Service page</h1>
      <Link href={`/service/${1}`}>Details</Link>
    </div>
  );
};

export default page;
