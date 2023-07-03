import './App.css';
import { Button } from './components/Button';
import { Container } from './components/Container';
import { Counter } from './components/class/Counter';
import { Greet } from './components/Greet';
import { Heading } from './components/Heading';
import { LoggedIn } from './components/LoggedIn';
import { Oscar } from './components/Oscar';
import { Person } from './components/Person';
import { PersonList } from './components/PersonList';
import { Status } from './components/Status';
import { User } from './components/context/User';
import { Box } from './components/context/Box';
import { ThemeContextProvider } from './components/context/ThemeContext';
import { MutableRef } from './components/ref/MutableRef';

function App() {
  // const personName = {
  //   first: 'Bruce',
  //   last: 'Wayne',
  // }

  // const nameList = [
  //   {
  //     first: 'Bruce',
  //     last: 'Wayne'
  //   },
  //   {
  //     first: 'Clark',
  //     last: 'kent'
  //   },
  //   {
  //     first: 'Princess',
  //     last: 'Diana'
  //   },
  // ]

  return (
    <div className="App">
      {/* <Greet name='Vishwas' messageCount={20} isLoggedIn={false} />
      <Person name={personName} />
      <PersonList names={nameList} /> */}

      {/* <Status status='loading' />
      <Heading >Placeholder text</Heading>
      <Oscar >
        <Heading >Oscar goes to Leonardo Dicpario!</Heading>
      </Oscar>
      <Greet name='vishwas' isLoggedIn={false} />
      <Button
        handleClick={(event, id) => {
          console.log('Button Clicked', event, id)
        }}
      />
      <Container styles={{ border: '1px solid black', padding: '1rem' }} />
      <LoggedIn/> */}
      {/* <User/> */}
      {/* <Counter/> */}
      {/* <ThemeContextProvider>
        <Box />
      </ThemeContextProvider> */}
      {/* <ThemeContextProvider>
        <User />
      </ThemeContextProvider> */}
      {/* <MutableRef/> */}
      <Counter message='The Count Value Is'/>
    </div>
  );
}

export default App;
