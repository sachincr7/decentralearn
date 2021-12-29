import { Button } from "@components/ui/common";
import { Fragment, useEffect, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

// const OPTIONS = ["All", "Purchased", "Activated", "Deactivated"];

const OPTIONS = [
  { name: "All" },
  { name: "Purchased" },
  { name: "Activated" },
  { name: "Deactivated" },
];

function EditInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function CourseFilter({ onSearchSubmit, onFilterSelect }) {
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState(OPTIONS[0]);

  useEffect(() => {
    onFilterSelect(selected);
  }, [selected]);

  return (
    <div className="flex items-center flex-col sm:flex-row mt-4">
      <div className="flex sm:mr-4">
        <div className="flex w-full relative rounded-md">
          <input
            onChange={({ target: { value } }) => setSearchText(value)}
            type="text"
            name="courseHash"
            id="courseHash"
            className="input  w-56 input-bordered mr-2"
            // className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
            placeholder="0x2341ab..."
          />
          <Button onClick={() => onSearchSubmit(searchText)}>Search</Button>
        </div>
      </div>
      <div className="flex justify-end sm:justify-start  mt-4 sm:mt-0">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1 w-36">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {OPTIONS.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `${
                        active ? "text-amber-900 bg-amber-100" : "text-gray-900"
                      }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-amber-600" : "text-amber-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
}
