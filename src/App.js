import { useRef } from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Filtered from "./Filtered";
import DataContext from "./store/data-context";
import { counterSliceActions } from "./store/data-redux";
const listOfText = ["hello", "hi", "snap", "chat", "face", "book"];
let counter = 0;
const folderData = {
  name: "root",
  type: "directory",
  children: [
    {
      name: "Documents",
      type: "directory",
      children: [
        {
          name: "work",
          type: "directory",
          children: [
            {
              name: "project1.docx",
              type: "file",
              size: "1024KB",
            },
            {
              name: "project2.docx",
              type: "file",
              size: "2048KB",
            },
          ],
        },
        {
          name: "personal",
          type: "directory",
          children: [
            {
              name: "resume.pdf",
              type: "file",
              size: "512KB",
            },
            {
              name: "travel_photos",
              type: "directory",
              children: [
                {
                  name: "beach.jpg",
                  type: "file",
                  size: "256KB",
                },
                {
                  name: "mountain.jpg",
                  type: "file",
                  size: "512KB",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Downloads",
      type: "directory",
      children: [
        {
          name: "software",
          type: "directory",
          children: [
            {
              name: "app1.exe",
              type: "file",
              size: "2048KB",
            },
            {
              name: "app2.exe",
              type: "file",
              size: "4096KB",
            },
          ],
        },
        {
          name: "music",
          type: "directory",
          children: [
            {
              name: "song1.mp3",
              type: "file",
              size: "512KB",
            },
            {
              name: "song2.mp3",
              type: "file",
              size: "1024KB",
            },
          ],
        },
      ],
    },
  ],
};

const MapData = [
  {
    id: "myOrder",
    type: "My order",
    name: "My Order",
    value: null,
    iconClass: "my-order-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "homeMove",
    type: "Home move",
    name: "Moving Home",
    value: null,
    iconClass: "moving-home-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "myFault",
    type: "My fault",
    name: "My Fault",
    value: null,
    iconClass: "my-fault-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "myBill",
    type: "My bill",
    name: "My Bill",
    value: null,
    iconClass: "my-bill-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "phoneLine",
    type: "Phone Line",
    name: "Landline",
    value: "Phone line",
    iconClass: "phoneline-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "broadband",
    type: "Broadband",
    name: "Broadband",
    value: "Broadband",
    iconClass: "broadband-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "btTV",
    type: "BT TV",
    name: "BT TV",
    value: "BT TV",
    iconClass: "bt-tv-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "btSport",
    type: "BT Sport",
    name: "BT Sport",
    value: "BT Sport",
    iconClass: "bt-sport-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "btMobile",
    type: "Mobile",
    name: "BT Mobile",
    value: "BT Mobile",
    iconClass: "bt-mobile-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "email",
    type: "Email",
    name: "E-Mail",
    value: null,
    iconClass: "email-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "eeRetail",
    type: "EE Retail",
    name: "Retail Stores",
    value: null,
    iconClass: "ee-retail-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "openreach",
    type: "Openreach",
    name: "Openreach",
    value: null,
    iconClass: "openreach-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "enjoy",
    type: "Enjoy",
    name: "Enjoy",
    value: null,
    iconClass: "enjoy-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "qube",
    type: "Qube",
    name: "Qube",
    value: null,
    iconClass: "enjoy-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "btInGeneral",
    type: "BT in general",
    name: "BT in General",
    value: null,
    iconClass: "bt-general-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "ceasedProducts",
    type: "Ceased products",
    name: "Ceased Products",
    value: null,
    iconClass: "ceased-products-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "eeInGeneral",
    type: "EE in general",
    name: "EE in general",
    value: null,
    iconClass: "ee-general-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "uso",
    type: "USO",
    name: "USO",
    value: null,
    iconClass: "broadband-icon",
    visibleTo: ["feature-mgr-uso-ecr", "feature-mgr-uso-helpdesk"],
    visibleOnlyToBacBrands: [],
  },
  {
    id: "homeSecurity",
    type: "Home Security",
    name: "Home Security",
    value: null,
    iconClass: "broadband-icon",
    visibleTo: ["advisor-general"],
    visibleOnlyToBacBrands: ["EE", "EEConsumer"],
  },
];

function Folder({ explorer }) {
  const [expanded, setIsExpanded] = useState(false);
  const handleOnExpand = () => {
    setIsExpanded(!expanded);
  };

  if (explorer.children) {
    return (
      <div>
        <div className="main">
          {expanded ? "- " : "+ "}
          <span onClick={handleOnExpand}>{explorer.name}</span>
        </div>

        {expanded && (
          <div className="subMenu">
            {explorer.children.map((subMenuFolder, index) => {
              return <Folder explorer={subMenuFolder}></Folder>;
            })}
          </div>
        )}
      </div>
    );
  } else {
    return <div>{explorer.name}</div>;
  }
}

function App() {
  const [filterValue, setFilterValue] = useState([]);
  const [dataJson, setDataJson] = useState([]);
  //const context = useContext(DataContext);
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    //context.getTheValue(e.target.value);
    const fil = listOfText.filter((val) => val.includes(e.target.value));
    console.log(fil);

    setFilterValue((prev) => [fil]);
    console.log(filterValue);
    dispatch(counterSliceActions.filterData(fil));
  };
  const fetchData = useRef(() => {});
  fetchData.current = async () => {
    const entries = await fetch("https://api.publicapis.org/entries");
    const getDataJson = await entries.json();
    const splicedData = getDataJson.entries.slice(0, 10);
    console.log(splicedData);
    setDataJson(splicedData);
  };
  useEffect(() => {
    fetchData.current();

    console.error("------------------Start FolderData -------------------");
    function filterOut(bacBrand) {
      console.error(MapData.length);
      const getMapData = MapData.filter(function (elm) {
        const visibleOnlyToBacBrands =
          elm &&
          Array.isArray(elm.visibleOnlyToBacBrands) &&
          elm.visibleOnlyToBacBrands;
        if (
          visibleOnlyToBacBrands.length === 0 ||
          (bacBrand && visibleOnlyToBacBrands.indexOf(bacBrand) > -1)
        ) {
          return elm;
        }
      });
      console.error("Found maps: ", getMapData);
    }
    filterOut("EEConsumer1");
    console.error("------------------End FolderData -------------------");
  }, []);

  function GetValue(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
  let one = new GetValue(1, 2, 3);
  console.log(one);

  class MySingleton {
    constructor() {
      if (!MySingleton.instance) {
        // Create the singleton instance if it doesn't exist
        this.data = [];
        MySingleton.instance = this;
      }
      // Return the existing singleton instance
      return MySingleton.instance;
    }

    addData(data) {
      this.data.push(data);
    }

    getData() {
      return this.data;
    }
  }

  // Create a new instance of the singleton
  const singletonInstance1 = new MySingleton();

  // Add some data to the singleton instance
  singletonInstance1.addData("Hello");
  singletonInstance1.addData("World");

  // Create another instance of the singleton
  const singletonInstance2 = new MySingleton();

  // Both instances reference the same data
  console.log(singletonInstance1.getData()); // ['Hello', 'World']
  console.log(singletonInstance2.getData()); // ['Hello', 'World']

  return (
    <div className="App">
      {/* <header className="App-header">
        <label> A Field</label>
        <input type="text" onChange={changeHandler} />
        <Filtered {...dataJson}></Filtered>
        {dataJson &&
        dataJson.length > 0 &&
        dataJson.map((val) => {
          return <span key={val.Description}>{val.API}</span>
        })}
      </header> */}
      <Folder explorer={folderData}></Folder>

      {/* {folderData.children.map(folder=>{
        return <Folder subMenu={folder.children}></Folder>
      })} */}
    </div>
  );
}

export default App;
