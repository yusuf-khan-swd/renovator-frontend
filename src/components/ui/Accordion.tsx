import type { CollapseProps } from "antd";
import { Collapse } from "antd";

interface IAccordion {
  data: any[];
}

const Accordion = ({ data }: IAccordion) => {
  const items: CollapseProps["items"] = data?.map((item: any) => {
    return {
      key: item?.id,
      label: item?.title,
      children: <p>{item?.description}</p>,
    };
  });

  return (
    <div style={{ maxWidth: "750px", margin: "0 auto" }}>
      {data && data?.length > 0 ? (
        <Collapse accordion items={items} />
      ) : (
        <p>No Data Available</p>
      )}
    </div>
  );
};

export default Accordion;
