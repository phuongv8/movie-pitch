import { apiCall } from './apiHandler.js';
import { openai } from './apiHandler.js'; 
import { setTextContent, setInnerHTML, setDisplay } from './domHandler';  // <-- Imported here

export const fetchTitle = async (synopsis) => {
    const response = await apiCall({
      model: 'text-davinci-003',
      prompt: `Generate a catchy movie title for this synopsis: ${synopsis}`,
      max_tokens: 25,
      temperature: 1,
    });
    return response;
  }

export const fetchStars = async (synopsis) => {
    const response = await apiCall({
      model: 'text-davinci-003',
      prompt: `Extract the names in brackets from the synopsis.
      ###
      synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
      names: Tom Cruise, Val Kilmer, Kelly McGillis
      ###
      synopsis: ${synopsis}
      names:   
      `,
      max_tokens: 30,
    });
    return response;
  }

export const fetchImagePrompt = async (title, synopsis) => {
    const response = await apiCall({
        model: 'text-davinci-003',
        prompt: `Give a short description of an image which could be used to advertise a movie based on a title and synopsis. The description should be rich in visual detail but contain no names.
        ###
        title: Love's Time Warp
        synopsis: When scientist and time traveler Wendy (Emma Watson) is sent back to the 1920s to assassinate a future dictator, she never expected to fall in love with them. As Wendy infiltrates the dictator's inner circle, she soon finds herself torn between her mission and her growing feelings for the leader (Brie Larson). With the help of a mysterious stranger from the future (Josh Brolin), Wendy must decide whether to carry out her mission or follow her heart. But the choices she makes in the 1920s will have far-reaching consequences that reverberate through the ages.
        image description: A silhouetted figure stands in the shadows of a 1920s speakeasy, her face turned away from the camera. In the background, two people are dancing in the dim light, one wearing a flapper-style dress and the other wearing a dapper suit. A semi-transparent image of war is super-imposed over the scene.
        ###
        title: zero Earth
        synopsis: When bodyguard Kob (Daniel Radcliffe) is recruited by the United Nations to save planet Earth from the sinister Simm (John Malkovich), an alien lord with a plan to take over the world, he reluctantly accepts the challenge. With the help of his loyal sidekick, a brave and resourceful hamster named Gizmo (Gaten Matarazzo), Kob embarks on a perilous mission to destroy Simm. Along the way, he discovers a newfound courage and strength as he battles Simm's merciless forces. With the fate of the world in his hands, Kob must find a way to defeat the alien lord and save the planet.
        image-description: A tired and bloodied bodyguard and hamster standing atop a tall skyscraper, looking out over a vibrant cityscape, with a rainbow in the sky above them.
        ###
        title: ${title}
        synopsis: ${synopsis}
        image-description: 
        `,
        max_tokens: 100,
      });
      return response;
}

export const fetchImageUrl = async (imagePrompt) => {
    const response = await openai.createImage({
        prompt: `There should be no text in this image. Visualize: ${imagePrompt}`,
        n: 1,
        size: '256x256',
        response_format: 'b64_json',
      });

      setInnerHTML(
        'output-img-container',
        `<img src="data:image/png;base64,${response.data.data[0].b64_json}">`
      );

      setInnerHTML(
        'setup-input-container',
        `<button id="view-pitch-btn" class="view-pitch-btn">View Pitch</button>`
      );
    
      document.getElementById('view-pitch-btn').addEventListener('click', () => {
        setDisplay('setup-container', 'none');
        setDisplay('output-container', 'flex');
    
        setTextContent(
          'movie-boss-text',
          `This idea is so good I'm jealous! It's gonna make you rich for sure! Remember, I want 10% 💰`
        );
      });
  
    return `data:image/png;base64,${response.data.data[0].b64_json}`;
  }