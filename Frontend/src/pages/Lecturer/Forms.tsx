import {styled} from '@mui/system';
import {TabsList as BaseTabsList} from '@mui/base/TabsList';
import {TabPanel as BaseTabPanel} from '@mui/base/TabPanel';
import {buttonClasses} from '@mui/base/Button';
import {Tab as BaseTab, tabClasses} from '@mui/base/Tab';
import {Tabs} from '@mui/base/Tabs';
import Sidebar from "../../components/Lecturer/Sidebar";
import Header from "../../components/Header/Header";
import {tokens} from "../../theme";
import useTheme from "@mui/material/styles/useTheme";
import AddAssignment from '../../components/Lecturer/AddAssignment';
import DeleteAssignment from '../../components/Lecturer/DeleteAssignment';
import Topbar from '../../components/Admin/Topbar';


export default function LecturerForms(){
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const Tab = styled(BaseTab)`
  font-family: 'Source Sans 3', sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  line-height: 1.5;
  padding: 8px 12px;
  margin: 6px;
  border: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${colors.blueAccent[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${colors.blueAccent[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${colors.blueAccent[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 400px;
  background-color: ${colors.blueAccent[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  box-shadow: 0px 4px 6px ${
    theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.4)' : 'rgba(0,0,0, 0.2)'
  };
  `)


    return(
        <div className="app">
            <Sidebar/>
        <main className="content">
            <Topbar/>
            <Header title="Forms" subtitle="Personnel Management"/>
    <Tabs defaultValue={0}>
      <TabsList>
        <Tab value={0}>Create</Tab>
        <Tab value={1}>Delete</Tab>
      </TabsList>
      <TabPanel value={0}><AddAssignment/></TabPanel>
      <TabPanel value={1}><DeleteAssignment/></TabPanel>
      </Tabs>
               
            </main>
        </div>
    );
}