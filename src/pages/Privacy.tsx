import {Seo} from '../components/Seo';

export const Privacy = () => {
  return (
    <div className="pt-24 min-h-screen">
      <Seo
        title="Politique de confidentialite"
        description="Politique de confidentialite et traitement des donnees personnelles."
      />
      <section className="section-container max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-serif mb-10 text-brand-brown">
          Politique de confidentialite
        </h1>
        <div className="space-y-8 text-brand-brown/80 leading-relaxed">
          <p>
            Nous collectons uniquement les donnees necessaires au traitement des messages envoyes
            via le formulaire de contact (nom, email, sujet, message).
          </p>
          <div>
            <h2 className="text-xl font-bold mb-2 text-brand-brown">Finalite</h2>
            <p>Repondre aux demandes d'information, de benevolat, de partenariat et de soutien.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2 text-brand-brown">Conservation</h2>
            <p>
              Les donnees sont conservees uniquement le temps necessaire au suivi des echanges.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2 text-brand-brown">Vos droits</h2>
            <p>
              Vous pouvez demander l'acces, la rectification ou la suppression de vos donnees en
              nous contactant a l'adresse email de l'association.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
