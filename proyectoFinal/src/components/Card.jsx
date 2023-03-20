import React, {useState} from "react";
import {Modal} from "./Modal.jsx";

const Card = (props) => {
  const { img, title, category, calification } = props;
  const [addReview, setAddReview] = useState(false)

  return (
      <>
          <div className="bg-[#362C29]/50 p-6 rounded-2xl flex flex-col gap-2 w-full md:w-auto">
              <img
                  src={img}
                  className="w-full xl:w-52 h-72 lg:h-64 object-cover rounded-2xl"
              />
              <h1 className="text-xl text-white">{title}</h1>
              <span className="text-gray-400">{category}</span>
              <div className="flex items-center gap-4">
                  <h5 className="text-3xl text-[#E58D27]">{calification}</h5>
                  <button className="bg-[#E58D27] text-black font-bold rounded-full w-full p-3 hover:-translate-y-1 transition-all duration-200"
                  onClick={()=>{
                      setAddReview(true);
                  }}
                      >
                      Review
                  </button>
              </div>
          </div>
          {addReview && (
              <Modal
                  title="Add review to game"
                  onClose={() => {
                      setAddReview(false);
                  }}
              >
                  <div>
                      <div>
                          <div className="mb-2"></div>
                          <div className="text-center text-cyan-800">
                            <label> Name : {title}</label>
                          </div>
                          <div className="mb-2"></div>
                      </div>
                      <form>
                          <div>
                              <label htmlFor="calification" className="sr-only">Your calification</label>
                              <input type="text" id="calification"
                                     className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                     placeholder="Your calification" required></input>
                          </div>
                          <div className="mb-2"></div>
                          <div
                              className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                  <label htmlFor="comment" className="sr-only">Your review</label>
                                  <textarea id="comment" rows="4"
                                            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                            placeholder="Write a comment..." required></textarea>
                              </div>
                              <div
                                  className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                  <button type="submit"
                                          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                      Post review
                                  </button>
                              </div>
                          </div>
                      </form>
                  </div>
              </Modal>
          )}
      </>
  );
};

export default Card;
