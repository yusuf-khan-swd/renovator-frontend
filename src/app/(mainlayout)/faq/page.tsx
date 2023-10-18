"use client";

import CenterLoading from "@/components/Loading/CenterLoading";
import Accordion from "@/components/ui/Accordion";
import { useFaqsQuery } from "@/redux/api/content/faqApi";

const FaqPage = () => {
  const { data, isLoading } = useFaqsQuery(undefined);

  return isLoading ? <CenterLoading /> : <Accordion data={data} />;
};

export default FaqPage;
