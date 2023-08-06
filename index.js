import { apiCall } from './apiHandler.js';
import { setTextContent, setInnerHTML, setDisplay } from './domHandler';
import { fetchTitle, fetchStars, fetchImagePrompt, fetchImageUrl } from './fetchHandler';


const setupTextarea = document.getElementById('setup-textarea');

document.getElementById('send-btn').addEventListener('click', async () => {
  const textAreaInput = setupTextarea.value;

  if (textAreaInput) {
    setInnerHTML(
      'setup-input-container',
      `<img src="images/loading.gif" class="loading" id="loading">`
    );
    setTextContent(
      'movie-boss-text',
      `Okie-dokie, give me a sec while my digital noggin munchin' on that idea... Nom nom nom! `
    );

    const botReply = await apiCall({
      model: 'text-davinci-003',
      prompt: `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
    ###
    outline: Two dogs fall in love and move to Hawaii to learn to surf.
    message: I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!
    ###
    outline: A plane crashes in the jungle and the passengers have to walk 1000km to safety.
    message: I'll spend a few moments considering that. But I love your idea!! A disaster movie in the jungle!
    ###
    outline: A group of corrupt lawyers try to send an innocent woman to jail.
    message: Wow that is awesome! Corrupt lawyers, huh? Give me a few moments to think!
    ###
    outline: ${textAreaInput}
    message: 
    `,
      max_tokens: 60,
    });
    setTextContent('movie-boss-text', botReply);

    const synopsis = await apiCall({
      model: 'text-davinci-003',
      prompt: `Generate an engaging, professional and marketable movie synopsis based on an outline. The synopsis should include actors names in brackets after each character. Choose actors that would be ideal for this role. 
    ###
    outline: A big-headed daredevil fighter pilot goes back to school only to be sent on a deadly mission.
    synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.  
    ###
    outline: ${textAreaInput}
    synopsis:
    `,
      max_tokens: 700,
    });
    setTextContent('output-text', synopsis);

    const title = await fetchTitle(synopsis);
    setTextContent('output-title', title);

    const stars = await fetchStars(synopsis);
    setTextContent('output-stars', stars);

    const imagePrompt = await fetchImagePrompt(title, synopsis);
    const imageUrl = await fetchImageUrl(imagePrompt);
    setInnerHTML(
      'output-img-container',
      `<img src="${imageUrl}" alt="${title}">`
    );
  }
});

