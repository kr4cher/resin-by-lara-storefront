import React from "react";
import { FormattedMessage } from "react-intl";

import { RichTextContent } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

enum TABS {
  DESCRIPTION,
  ATTRIBUTES,
}

export const ProductDescription: React.FC<IProps> = ({
  description = "",
  descriptionJson = "",
  attributes,
}: IProps) => {
  const [activeTab, setActiveTab] = React.useState<TABS>(TABS.DESCRIPTION);
  const showAttributesTab: boolean = !!attributes && attributes.length > 0;

  return (
    <S.Wrapper>
      <S.Tabs>
        <S.TabTitle
          active={activeTab === TABS.DESCRIPTION}
          onClick={evt => {
            evt.stopPropagation();
            setActiveTab(TABS.DESCRIPTION);
          }}
        >
          <FormattedMessage defaultMessage="DESCRIPTION" />
        </S.TabTitle>

        {showAttributesTab && (
          <S.TabTitle
            active={activeTab === TABS.ATTRIBUTES}
            onClick={evt => {
              evt.stopPropagation();
              setActiveTab(TABS.ATTRIBUTES);
            }}
          >
            <FormattedMessage defaultMessage="ATTRIBUTES" />
          </S.TabTitle>
        )}
      </S.Tabs>
      {activeTab === TABS.DESCRIPTION &&
        (descriptionJson ? (
          <RichTextContent descriptionJson={descriptionJson} />
        ) : (
          <p>{description}</p>
        ))}
      {showAttributesTab && activeTab === TABS.ATTRIBUTES && (
        <S.AttributeList>
          {attributes &&
            attributes.map((attribute, index) => (
              <li key={index}>
                <S.AttributeName>{attribute.attribute.name}: </S.AttributeName>{" "}
                {attribute.values.map(value => value.name).join(", ")}
              </li>
            ))}
        </S.AttributeList>
      )}
    </S.Wrapper>
  );
};
