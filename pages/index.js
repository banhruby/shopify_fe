import React, { useState } from 'react';
import { Page, Layout, EmptyState } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import ResourceListWithProducts from './components/ResourceList';
import store from 'store-js';

const img = "https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg";

const Index = () => {
  const [open, setOpen] = useState(false)
  const emptyState = !store.get('ids');

  const handleSelection = (resources) => {
    setOpen(false)
    const idsFromResources = resources.selection.map((product) => product.id);
    store.set('ids', idsFromResources);
    console.log(idsFromResources)
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
      <Layout>
        { emptyState ?(
          <EmptyState
            heading="Discount your products temporarily"
            action={{
              content: "Select products",
              onAction: () => {
                setOpen(true);
                console.log('clicked')
              }
            }}
            image={img}
          >
            <p>Select products to change their price temporarily.</p>
          </EmptyState>):(
            <ResourceListWithProducts />
          )
        }
      </Layout>
    </Page>
  )
}
export default Index;
