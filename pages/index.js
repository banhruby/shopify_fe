import React, { useState } from 'react';
import { Page, Layout, EmptyState } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import ResourceListWithProducts from './components/ResourceList';

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [idsFromResources, setIdsFromResources] = useState([]);

  const handleSelection = (resources) => {
    setOpen(false)
    const idsFromResources = resources.selection.map((product) => product.id);
    setIdsFromResources(idsFromResources)
  }

  return (
    <Page>
      <TitleBar
        primaryAction={{
          content: 'Select products',
          onAction: () => setOpen(true),
        }}
      />
      <ResourcePicker
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setOpen(false)}
      />
        { idsFromResources.length === 0 ?(
          <EmptyState
            heading="Discount your products temporarily"
            action={{
              content: "Select products",
              onAction: () => {
                setOpen(true);
              }
            }}
            image={img}
          >
            <p>Select products to change their price temporarily.</p>
          </EmptyState>):(
            <ResourceListWithProducts idsFromResources={idsFromResources} />
          )
        }
    </Page>
  )
}
export default Index;
