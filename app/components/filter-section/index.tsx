import { Select, Checkbox, Button } from "@mantine/core";

type Props = {
  classes: any;
  showViral: boolean;
  setShowViral: (value: boolean) => void;
  section: SectionsType;
  setSection: (value: SectionsType) => void;
  sort: SortType;
  setSort: (value: SortType) => void;
  window: WindowType;
  setWindow: (value: WindowType) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

function index({
  classes,
  showViral,
  setShowViral,
  section,
  setSection,
  sort,
  setSort,
  window,
  setWindow,
  onSubmit,
}: Props) {
  return (
    <form className="filter-section" onSubmit={onSubmit}>
      <div className="inline-inputs">
        <Select
          label="Section"
          value={section}
          onChange={(value) => setSection(value as SectionsType)}
          placeholder={"Pick one"}
          data={[
            { label: "Hot", value: "hot" },
            { label: "Top", value: "top" },
            { label: "User", value: "user" },
          ]}
          className={`select-input ${classes}`}
          style={{ zIndex: 2 }}
        />

        <Select
          label="Sort"
          value={sort}
          onChange={(value) => setSort(value as SortType)}
          placeholder={"Pick one"}
          data={[
            { label: "Viral", value: "viral" },
            { label: "Top", value: "top" },
            { label: "Time", value: "time" },
            { label: "Rising", value: "rising" },
          ]}
          className={`select-input ${classes}`}
          style={{ zIndex: 2 }}
        />

        <Select
          label="Window"
          value={window}
          onChange={(value) => setWindow(value as WindowType)}
          placeholder={"Pick one"}
          data={[
            { label: "Day", value: "day" },
            { label: "Week", value: "week" },
            { label: "Month", value: "month" },
            { label: "Year", value: "year" },
            { label: "All", value: "all" },
          ]}
          className={`select-input ${classes}`}
          style={{ zIndex: 2 }}
        />
      </div>
      <div className="inline-inputs second-line-inputs">
        <Checkbox
          mr="xl"
          size="sm"
          tabIndex={-1}
          checked={showViral}
          label="Viral images"
          className="viral-images-checkbox"
          onChange={() => setShowViral(!showViral)}
          styles={{ input: { cursor: "pointer" }, label: { fontSize: 15 } }}
        />
        <Button type="submit" px={32}>
          Search
        </Button>
      </div>
    </form>
  );
}

export default index;
