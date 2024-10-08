import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  .price {
    padding-left: 6px;
  }

  .quantity {
    display: flex;
    padding: 0px 6px;

    .arrow {
      cursor: pointer;
    }

    .value {
      margin: 0 10px;
    }
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 18px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const TextContainer = styled.span`
  width: 23%;
`;

export const RemoveButton = styled.div`
  padding-left: 18px;
  cursor: pointer;
`;
