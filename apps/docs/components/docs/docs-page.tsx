import type { ReactNode } from "react";
import {
  TableOfContents,
  type TocItem,
} from "./table-of-contents";

export interface DocsPageProps {
  children: ReactNode;
  toc?: TocItem[];
}

export function DocsPage({ children, toc }: DocsPageProps) {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-12">
      <article className="mx-auto w-full max-w-3xl pb-10">{children}</article>
      {toc && toc.length > 0 ? (
        <aside className="hidden xl:block">
          <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden pt-2">
            <div className="thin-scroll h-full overflow-y-auto pr-2">
              <TableOfContents items={toc} />
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
