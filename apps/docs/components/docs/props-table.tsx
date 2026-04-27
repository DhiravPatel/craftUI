import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@craftui/ui";

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description?: string;
}

export function PropsTable({
  props,
  caption,
}: {
  props: PropDef[];
  caption?: string;
}) {
  return (
    <Table className="my-6">
      {caption ? <TableCaption>{caption}</TableCaption> : null}
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.map((p) => (
          <TableRow key={p.name}>
            <TableCell className="font-mono text-sm">
              {p.name}
              {p.required ? <span className="text-destructive">*</span> : null}
            </TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">
              {p.type}
            </TableCell>
            <TableCell className="font-mono text-xs">
              {p.default ?? "—"}
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {p.description ?? ""}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
