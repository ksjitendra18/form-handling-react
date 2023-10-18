import { z } from "zod";
import { useRef, FormEvent, useState } from "react";

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(5, { message: "Name must be more than 5 characters" })
    .max(50, { message: "Name must be less than 50 characters" })
    .trim(),

  description: z
    .string({ required_error: "Description is required" })
    .min(10, { message: "Description must be more than 10 characters" })
    .max(150, { message: "Description must be less than 150 characters" })
    .trim(),

  price: z.coerce
    .number({ required_error: "Price is required" })
    .min(0, { message: "Price should be more than 0" }),

  category: z
    .string({ required_error: "Category is required" })
    .refine((val) => val !== "uncategorised", {
      message: "Choose category other than uncategorised",
    }),

  is_featured: z.boolean(),
});

type FormSchema = z.infer<typeof formSchema>;

const FormTwo = () => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="my-10 w-full">
        <h2 className="text-2xl text-center font-bold">Add New</h2>
        <form onSubmit={handleSubmit} className="lg:w-1/2 mx-auto px-5 py-5">
          <label className=" block" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            min={2}
            max={50}
            className="border-2 mb-2 border-gray-500  focus-visible:border-0 focus-visible:outline-2  rounded-md px-3 py-2 w-full"
            name="name"
            id="text"
            required
          />

          <label className="block" htmlFor="description">
            Product Description
          </label>
          <textarea
            minLength={10}
            maxLength={150}
            rows={5}
            className="border-2 mb-2 border-gray-500  focus-visible:border-0 focus-visible:outline-2  rounded-md px-3 py-2 w-full"
            name="description"
            id="description"
            required
          />

          <label className="block" htmlFor="price">
            Product Price
          </label>
          <input
            className="border-2 mb-2 border-gray-500  focus-visible:border-0 focus-visible:outline-2  rounded-md px-3 py-2 w-full"
            type="number"
            name="price"
            min={0}
            id="price"
            required
          />

          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            className=" border bg-[#f8f8f8] border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  "
          >
            <option value="uncategorised">Choose a category</option>
            <option value="shirts">Shirts</option>
            <option value="pants">Pants </option>
            <option value="glasses">Glasses</option>
            <option value="hats">Hats</option>
          </select>

          <label className="my-3 inline-block" htmlFor="is_featured">
            Featured Product
          </label>
          <input
            id="is_featured"
            name="is_featured"
            className="ml-5"
            type="checkbox"
          />
          <div className="flex justify-end">
            <button className=" bg-blue-500 hover:scale-95 transition-all duration-75 ease-in px-5 py-2 rounded-md text-white">
              Add New Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormTwo;
