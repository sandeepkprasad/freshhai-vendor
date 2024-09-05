import React, { useContext, Suspense, lazy } from "react";
import "../App.css";
import { ProductsContext } from "../context/ProductsContext";

// Components Imports
import DashboardWrapper from "../components/DashboardWrapper";
import Heading from "../components/customComponents/Heading";
import ProductFilter from "../components/customComponents/ProductFilter";
import AddModal from "../components/AddModal";
import UpdateModal from "../components/UpdateModal";
import DeleteModal from "../components/DeleteModal";

const ProductCard = lazy(() => import("../components/ProductCard"));

const Products = () => {
  const {
    allProducts,
    isAddModal,
    isUpdateModal,
    isDeleteModal,
    setIsAddModal,
    productFilter,
  } = useContext(ProductsContext);

  // Filtering logic
  const filteredProducts = allProducts?.filter((product) => {
    return (
      (productFilter?.category === "" ||
        product?.category?.main === productFilter?.category) &&
      (productFilter?.brand === "" ||
        product?.brand === productFilter?.brand) &&
      (productFilter?.origin === "" ||
        product?.origin === productFilter?.origin) &&
      (productFilter?.available === "" ||
        product?.isAvailable === productFilter?.available)
    );
  });

  return (
    <>
      <DashboardWrapper>
        <div className="w-full h-full flex flex-col justify-between items-center overflow-hidden">
          <div className="w-full h-fit flex justify-between items-center">
            <Heading heading="All Products" />
            <div className="w-[75%] h-fit flex items-center space-x-[2%]">
              <ProductFilter />
              <div className="w-[15%] h-fit border-l-2 border-neutral-gray-medium flex justify-end items-center">
                <button
                  className="buttonClass bg-primary-blue-dark"
                  onClick={() => setIsAddModal(true)}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
          {filteredProducts?.length > 0 ? (
            <div className="w-full h-[90%] grid grid-cols-5 pb-[1%] overflow-x-hidden overflow-y-scroll customScrollbar">
              <Suspense
                fallback={
                  <div className="w-full h-[95%] flex justify-center items-center">
                    <p className="font-semibold text-xl text-neutral-gray-medium">
                      Loading all products...
                    </p>
                  </div>
                }
              >
                {filteredProducts?.map((product, index) => (
                  <ProductCard data={product} key={index} />
                ))}
              </Suspense>
            </div>
          ) : (
            <div className="w-full h-[95%] flex justify-center items-center">
              <p className="font-semibold text-xl text-neutral-gray-medium">
                No product available
              </p>
            </div>
          )}
        </div>
      </DashboardWrapper>

      {isAddModal && <AddModal />}

      {isUpdateModal && <UpdateModal />}

      {isDeleteModal && <DeleteModal />}
    </>
  );
};

export default Products;
