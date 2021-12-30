import React, { useState, useCallback } from "react";
import gql from "graphql-tag";
import { useMutation } from "@shopify/react-graphql";
import { Layout, Button, Banner, Toast, Stack, Frame, TextField,Card } from '@shopify/polaris';

const UPDATE_PRICE = gql`
  mutation productVariantUpdate($input: ProductVariantInput!) {
    productVariantUpdate(input: $input) {
      product {
        title
      }
      productVariant {
        id
        price
      }
    }
  }
`;

const UpdateProduct = (props) => {
  const updatePrice = useMutation(UPDATE_PRICE);

  const [hasResults, setHasResults] = useState(false);
  const [error, setError] = useState();
  const [price, setPrice] = useState('');

  const handleChange = useCallback((newValue) => setPrice(newValue), []);

  const showError = error && (
    <Banner status="critical">{error.message}</Banner>
  );

  const showToast = hasResults && (
    <Toast
      content="Successfully updated"
      onDismiss={() => setHasResults(false)}
    />
  );

  const handleClick = async () => {
    for (const variantId in props.selectedItems) {
      const productVariableInput = {
        id: props.selectedItems[variantId].variants.edges[0].node.id,
        price: price
      };

      try {
        await updatePrice({
          variables: {
            input: productVariableInput
          }
        });
      } catch (e) {
        setError(e)
      }
      
      try {
        props.onUpdate()
        setHasResults(true)
      } catch (e) {
        setError(e)
      }
    }
  };

  return (
    <Frame>
      {showToast}
      <Layout.Section>
        {showError}
      </Layout.Section>

      <Card>
        <TextField
          label="Price"
          value={price}
          onChange={handleChange}
          autoComplete="off"
        />
        <Button
          primary
          textAlign={"center"}
          onClick={() => handleClick()} >
          Update prices
        </Button>
      </Card>
    </Frame>
  );
};

export default UpdateProduct;
