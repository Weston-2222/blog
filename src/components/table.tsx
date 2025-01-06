import {
  Table as TableUI,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type TableProps = {
  header: string[];
  body: string[][];
  className?: string;
};
const Table = ({ header, body, className }: TableProps) => {
  return (
    <div className='overflow-x-auto w-[90vw]'>
      <TableUI className={className}>
        <TableHeader>
          <TableRow>
            {header.map((h) => (
              <TableHead key={h}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((content, index) => (
            <TableRow key={index}>
              {content.map((c) => (
                <TableCell key={c} className='whitespace-nowrap'>
                  {c}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableUI>
    </div>
  );
};

export default Table;
