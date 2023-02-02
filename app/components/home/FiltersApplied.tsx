import { Badge } from "@mantine/core";

function FiltersApplied({
  paramsEntries,
  inter,
}: {
  paramsEntries: [string, string][];
  inter: any;
}) {
  return (
    <div className="filters-applied-section">
      <span className="filters-applied-title" style={inter.style}>
        Filters applied:
      </span>
      <div className="filters-applied-badges">
        {paramsEntries.map(([key, value], index) => (
          <Badge key={index} color="blue" variant="filled" style={inter.style}>
            {key}: {value == "true" ? "yes" : value == "false" ? "no" : value}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default FiltersApplied;
