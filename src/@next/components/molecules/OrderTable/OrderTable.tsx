import Link from "next/link";
import React from "react";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import Media from "react-media";
import { ThemeContext } from "styled-components";

import { TaxedMoney } from "@components/containers";
import { paths } from "@paths";
import { commonMessages, translateOrderStatus } from "@temp/intl";

import { Thumbnail } from "..";
import * as S from "./styles";
import { IProps } from "./types";

const header = (matches: boolean) => (
  <S.HeaderRow>
    <S.IndexNumber>
      <FormattedMessage defaultMessage="Index Number" />
    </S.IndexNumber>
    {matches && (
      <>
        <S.ProductsOrdered>
          <FormattedMessage defaultMessage="Products Ordered" />
        </S.ProductsOrdered>
        <S.DateOfOrder>
          <FormattedMessage defaultMessage="Date of Order" />
        </S.DateOfOrder>
        <S.Value>
          <FormattedMessage defaultMessage="Value" />
        </S.Value>
      </>
    )}
    <S.Status>
      <FormattedMessage {...commonMessages.status} />
    </S.Status>
  </S.HeaderRow>
);

export const OrderTable: React.FC<IProps> = ({ orders, isGuest }: IProps) => {
  const theme = React.useContext(ThemeContext);
  const intl = useIntl();

  return (
    <S.Wrapper>
      <Media
        query={{
          minWidth: theme.breakpoints.largeScreen,
        }}
      >
        {(matches: boolean) => {
          return (
            <>
              <S.Row>{header(matches)}</S.Row>
              {orders.map(
                ({
                  node: { created, token, number, lines, total, statusDisplay },
                }) => {
                  const date = new Date(created);
                  return (
                    <Link
                      href={{
                        pathname: isGuest
                          ? paths.guestOrderDetail
                          : paths.accountOrderDetail,
                        query: { token },
                      }}
                      key={number!}
                    >
                      <S.Row
                        data-test="orderEntry"
                        data-test-id={number!}
                        key={number!}
                      >
                        <S.IndexNumber>{number!}</S.IndexNumber>
                        {matches ? (
                          <>
                            <S.ProductsOrdered>
                              {lines.slice(0, 5).map(product => (
                                <Link
                                  href={{
                                    pathname: paths.product,
                                    query: {
                                      slug: product!.variant!.product.slug,
                                    },
                                  }}
                                  key={product!.variant!.product.id}
                                >
                                  <a>
                                    <Thumbnail source={product!} />
                                  </a>
                                </Link>
                              ))}
                            </S.ProductsOrdered>
                            <S.DateOfOrder>
                              <FormattedDate value={date} />
                            </S.DateOfOrder>
                            <S.Value>
                              <TaxedMoney taxedMoney={total} />
                            </S.Value>
                          </>
                        ) : (
                          ""
                        )}
                        <S.Status>
                          {translateOrderStatus(statusDisplay!, intl)}
                        </S.Status>
                      </S.Row>
                    </Link>
                  );
                }
              )}
            </>
          );
        }}
      </Media>
    </S.Wrapper>
  );
};
