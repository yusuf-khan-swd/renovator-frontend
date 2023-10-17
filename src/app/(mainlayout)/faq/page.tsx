"use client";

import { useFaqsQuery } from "@/redux/api/content/faqApi";
import { Card } from "antd";

const FaqPage = () => {
  const { data, isLoading } = useFaqsQuery(undefined);

  return (
    <div>
      <h1>Faq Page</h1>
      {data?.map((faq: any) => (
        <div key={faq?.id}>
          <Card hoverable title={faq?.title} style={{ width: 240 }}>
            <p>{faq?.description}</p>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default FaqPage;
