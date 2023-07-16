import CardCatalog from "@/component/CardCatalog";
import { auth } from "../firebase/app";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useScryfallCardCatalog from "@/service/ScryfallCardCatalog";
import axios from "axios";
import useResource from "@/hooks/useResource";
import NotLoggedInModal from "@/component/modal/NotLoggedInModal";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  const [loadingCards, cards, next] = useScryfallCardCatalog(15);
  const [savedCards] = useResource(user && `/api/cards/${user.uid}/save`, [user]);
  const [localSavedCards, setLocalSavedCards] = useState([]);
  const [loggedInModalOpen, setLoggedInModalOpen] = useState(false);

  const saveCard = async (card, saved) => {
    if (!user) {
      setLoggedInModalOpen(true);
      return;
    }

    const saveUrl = saved ? 'save' : 'unsave';
    await axios.post(`/api/cards/${user.uid}/${saveUrl}`, { card: card['id'] })
      .then(() => {
        if (saved) {
          setLocalSavedCards([...localSavedCards, card['id']]);
          return;
        }

        setLocalSavedCards(localSavedCards.filter((cardId) => cardId !== card['id']));
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    if (!savedCards) return;

    setLocalSavedCards(savedCards['cardIds']);
  }, [savedCards]);

  return (
    <>
      <Box sx={
        {
          display: 'flex',
          flexDirection: 'row',
          width: '98vw',
          flexWrap: 'wrap',
          gap: '0.5em',
          marginTop: '1em',
          justifyContent: 'center',
          paddingTop: '4em',
        }
      }>
        <CardCatalog
          cards={cards}
          next={next}
          loading={loadingCards}
          saveCard={saveCard}
          savedCards={localSavedCards}
        />
      </Box>
      <NotLoggedInModal
        open={loggedInModalOpen}
        setOpen={setLoggedInModalOpen}
      />
    </>
  )
};

export default Home;