import { BaseCategory } from "@saleor/sdk/lib/fragments/gqlTypes/BaseCategory";
import { CategoryDetails } from "@saleor/sdk/lib/fragments/gqlTypes/CategoryDetails";
import classNames from "classnames";
import Link from "next/link";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";

import { paths } from "@paths";
import { commonMessages } from "@temp/intl";
import { generatePath } from "@utils/core";

import "./scss/index.scss";
import { smallScreen } from "../../globalStyles/scss/variables.scss";

export interface Breadcrumb {
  value: string;
  link: string;
}

export const extractBreadcrumbs = (
  category: CategoryDetails,
  ancestors: BaseCategory[]
) => {
  const constructLink = ({ slug, name }: CategoryDetails | BaseCategory) => ({
    link: generatePath(paths.category, { slug }),
    value: name,
  });

  let breadcrumbs = [constructLink(category)];

  if (ancestors.length) {
    const ancestorsList = ancestors.map(category => constructLink(category));
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};

const getBackLink = (breadcrumbs: Breadcrumb[]) =>
  breadcrumbs.length > 1
    ? breadcrumbs[breadcrumbs.length - 2].link
    : paths.home;

const Breadcrumbs: React.FC<{
  breadcrumbs: Breadcrumb[];
}> = ({ breadcrumbs }) => (
  <Media
    query={{
      minWidth: smallScreen,
    }}
  >
    {matches =>
      matches ? (
        <ul className="breadcrumbs">
          <li>
            <Link href={paths.home}>
              <a>
                <FormattedMessage {...commonMessages.home} />
              </a>
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, index) => (
            <li
              key={`${breadcrumb.value}-${index}`}
              className={classNames({
                breadcrumbs__active: index === breadcrumbs.length - 1,
              })}
            >
              <Link href={breadcrumb.link}>
                <a>{breadcrumb.value}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="breadcrumbs">
          <Link href={getBackLink(breadcrumbs)}>
            <a>
              <FormattedMessage defaultMessage="Back" />
            </a>
          </Link>
        </div>
      )
    }
  </Media>
);

export default Breadcrumbs;
