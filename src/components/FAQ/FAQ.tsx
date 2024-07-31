"use client";

import CenterLoading from "@/components/Loading/CenterLoading";
import Accordion from "@/components/ui/Accordion";
import { useFaqsQuery } from "@/redux/api/content/faqApi";

const FAQ = () => {
  const { data, isLoading } = useFaqsQuery(undefined);

  return isLoading ? (
    <CenterLoading />
  ) : data && data?.length > 0 ? (
    <Accordion data={data} />
  ) : (
    <h3 style={{ margin: "2px", textAlign: "center" }}>No FAQs available</h3>
  );
};

export default FAQ;
