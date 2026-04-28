import {Seo} from '../components/Seo';
import {CONTACT_INFO} from '../data';

export const Legal = () => {
  return (
    <div className="pt-24 min-h-screen">
      <Seo
        title="Mentions legales"
        description="Informations legales de l'association Cœur and Care."
      />
      <section className="section-container max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-serif mb-10 text-brand-brown">Mentions legales</h1>
        <div className="space-y-8 text-brand-brown/80 leading-relaxed">
          <p>
            Cœur and Care est une association loi 1901 engagee dans la solidarite, l'education et
            l'accompagnement des enfants et des mamans vulnerables.
          </p>
          <div>
            <h2 className="text-xl font-bold mb-2 text-brand-brown">Editeur du site</h2>
            <p>Cœur and Care</p>
            <p>Email: {CONTACT_INFO.email}</p>
            <p>Telephone: {CONTACT_INFO.phone}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2 text-brand-brown">Hebergement</h2>
            <p>Site heberge sur Vercel (Vercel Inc.).</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2 text-brand-brown">Propriete intellectuelle</h2>
            <p>
              Les contenus (textes, visuels, identite graphique) sont la propriete de Cœur and Care
              sauf mention contraire. Toute reproduction sans autorisation est interdite.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
