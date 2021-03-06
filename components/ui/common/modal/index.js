/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "@components/ui/common";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useEthPrice } from "@components/hooks/useEthPrice";

const defaultOrder = {
  price: "",
  email: "",
  confirmationEmail: "",
};

const _createFormState = (isDisabled = false, message = "") => ({
  isDisabled,
  message,
});

const createFormState = (
  { price, email, confirmationEmail },
  hasAgreedTOS,
  isNewPurchase
) => {
  if (!price || Number(price) <= 0) {
    return _createFormState(true, "Price is not valid.");
  }

  if (isNewPurchase) {
    if (confirmationEmail.length === 0 || email.length === 0) {
      return _createFormState(true);
    } else if (email !== confirmationEmail) {
      return _createFormState(true, "Email is not matching.");
    }
  }

  if (!hasAgreedTOS) {
    return _createFormState(
      true,
      "You need to agree with terms of service in order to submit the form."
    );
  }

  return _createFormState();
};

export default function Modal({ course, onClose, onSubmit, isNewPurchase }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEthPriceEnabled, setIsEthPriceEnabled] = useState(false);
  const [order, setOrder] = useState(defaultOrder);
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false);

  const { eth } = useEthPrice();

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (!!course) {
      setIsOpen(true);
      setOrder({
        ...defaultOrder,
        price: eth.perItem,
      });
    }
  }, [course]);

  const closeModal = () => {
    setIsOpen(false);
    setOrder(defaultOrder);
    setIsEthPriceEnabled(false);
    setHasAgreedTOS(false);
    onClose();
  };

  const formState = createFormState(order, hasAgreedTOS, isNewPurchase);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="hidden  mx-auto flex-shrink-0 md:flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3  sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg text-center leading-6 font-medium text-gray-900"
                    >
                      {course?.title}
                    </Dialog.Title>
                    <div className="mt-4 relative rounded-md">
                      <div className="mb-1">
                        <label className=" md:block mb-2 font-bold text-gray-800">
                          Price(eth)
                        </label>
                        <div className="text-xs text-gray-700 flex">
                          <label className="flex items-center mr-2">
                            <input
                              checked={isEthPriceEnabled}
                              onChange={({ target: { checked } }) => {
                                setOrder({
                                  ...order,
                                  price: checked ? order.price : eth.perItem,
                                });
                                setIsEthPriceEnabled(checked);
                              }}
                              type="checkbox"
                              className="form-checkbox"
                            />
                          </label>
                          <span>
                            Adjust Price - only when the price is not correct
                          </span>
                        </div>
                      </div>
                      <input
                        disabled={!isEthPriceEnabled}
                        onChange={({ target: { value } }) => {
                          if (isNaN(value)) {
                            return;
                          }
                          setOrder({
                            ...order,
                            price: value,
                          });
                        }}
                        value={order.price}
                        placeholder="Enter adjusted price"
                        className="input input-bordered bg-white input-primary text-black input-sm mt-1"
                        type="number"
                      />
                      <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2 mt-2">
                        <p className="text-xs text-yellow-700 mt-1">
                          Price will be verified at the time of the order. If
                          the price will be lower, order can be declined (+- 2%
                          slipage is allowed)
                        </p>
                      </div>
                    </div>
                    {isNewPurchase && (
                      <>
                        <div className="mt-2 relative rounded-md">
                          <div className="flex md:block mt-4  items-center">
                            <div className="mb-1 mr-4">
                              <label className="mb-2 font-bold text-gray-800">
                                Email
                              </label>
                            </div>
                            <input
                              onChange={({ target: { value } }) => {
                                setOrder({
                                  ...order,
                                  email: value.trim(),
                                });
                              }}
                              placeholder="Enter email"
                              className="input bg-white input-bordered text-black input-primary input-sm"
                              type="email"
                            />
                          </div>

                          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-2 mt-2">
                            <p className="text-xs text-yellow-700 mt-1">
                              It&apos;s important to fill a correct email,
                              otherwise the order cannot be verified. We are not
                              storing your email anywhere.
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 relative rounded-md">
                          <div className="flex md:block mt-4  items-center">
                            <div className="mb-1 mr-4">
                              <label className="mb-2 font-bold text-gray-800">
                                Repeat Email
                              </label>
                            </div>
                            <input
                              onChange={({ target: { value } }) => {
                                setOrder({
                                  ...order,
                                  confirmationEmail: value.trim(),
                                });
                              }}
                              placeholder="Enter email"
                              className="input bg-white input-bordered text-black input-primary input-sm"
                              type="text"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="text-xs  items-center flex mt-5">
                      <label className="flex items-center mr-2">
                        <input
                          checked={hasAgreedTOS}
                          onChange={({ target: { checked } }) => {
                            setHasAgreedTOS(checked);
                          }}
                          type="checkbox"
                          className="form-checkbox"
                        />
                      </label>
                      <span>
                        I accept Eincode &apos;terms of service&apos; and I
                        agree that my order can be rejected in the case data
                        provided above are not correct.
                      </span>
                    </div>
                    {formState.message && (
                      <div className="p-4 my-3 text-yellow-700 bg-yellow-200 rounded-lg text-sm">
                        {formState.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  size="md"
                  disabled={formState.isDisabled}
                  className="w-full md:w-1/4"
                  variant="primary"
                  // className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    onSubmit(order, course);
                    closeModal();
                  }}
                >
                  Submit
                </Button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex items-center md:mr-2 justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none outline-none  focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
