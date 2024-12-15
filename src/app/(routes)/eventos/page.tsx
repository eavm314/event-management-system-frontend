"use client";
import { useEffect, useState } from "react";
import InfoImage from "../../components/InfoImage";
import { EventCardModel } from "../../models/eventCardModel";
import ModalPage from "../../modals/ModalPage";
import ModalLoading from "../../modals/ModalLoading";
import { getEvents } from "../../services/eventService";
import { calculateState } from "../../helpers/getDateState";
import PrimaryButton from "../../components/PrimaryButton";
import ModalConfirmation from "../../modals/ModalConfirmation";
import ModalMessage from "../../modals/ModalMessage";
import { enrollEvents } from "../../services/studentService";

const InicioPage = () => {
  const [feed, setFeed] = useState<EventCardModel[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const [infoModal, setInfoModal] = useState<boolean>(false);

  const [selectedEvent, setSelectedEvent] = useState<EventCardModel>();

  const getData = async () => {
    const eventsData = await getEvents();
    console.log(eventsData);
    setFeed(eventsData);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const handleEnroll = async (eventCode: EventCardModel) => {
    setSelectedEvent(eventCode);
    setConfirmationModal(true);
  };

  const FeedCard = (event: EventCardModel, index: number) => {
    return (
      <InfoImage
        key={index}
        urlImage={event.image}
        imageTitle={event.name}
        reverse={index % 2 == 1}
        classNameImage="w-1/4"
      >
        <div className="p-10 w-3/4">
          <h2 className="text-xl font-bold">{event.name}</h2>
          <p className="mt-5 mb-10">{event.description}</p>
          <div>
            <p>
              Area: <span className="underline">{event.area}</span>
            </p>
            <p>Estado: {calculateState(event.startDate, event.endDate)}</p>
            {event.canEnroll === 1 && (
              <PrimaryButton
                typeButton="button"
                textButton="Inscribirse"
                className="mt-5"
                action={() => handleEnroll(event)}
              />
            )}
            {event.canEnroll === 2 && (
              <p className="mt-5 font-semibold text-lg">Ya estás Inscrito!</p>
            )}
          </div>
        </div>
      </InfoImage>
    );
  };
  return (
    <>
      {loading && (
        <ModalPage>
          <ModalLoading />
        </ModalPage>
      )}
      {confirmationModal && (
        <ModalPage>
          <ModalConfirmation
            actionOne={async () => {
              await enrollEvents([selectedEvent?.codEvent ?? ""]);
              setFeed(
                feed.map((ev) => {
                  return {
                    ...ev,
                    canEnroll:
                      ev.codEvent === selectedEvent?.codEvent
                        ? 2
                        : ev.canEnroll,
                  };
                })
              );
              setConfirmationModal(false);
              setInfoModal(true);
            }}
            actionTwo={() => setConfirmationModal(false)}
            title={"Confirmar Inscripcion"}
            message={`Te inscribirás a ${selectedEvent?.name}.`}
          />
        </ModalPage>
      )}

      {infoModal && (
        <ModalPage>
          <ModalMessage
            action={() => {
              setInfoModal(false);
              setSelectedEvent(undefined);
            }}
            title={"Inscripción exitosa"}
            message={"Evento inscrito correctamente."}
          />
        </ModalPage>
      )}

      <div className="p-0">
        {feed.map((item, index) => {
          return FeedCard(item, index);
        })}
      </div>
    </>
  );
};

export default InicioPage;
