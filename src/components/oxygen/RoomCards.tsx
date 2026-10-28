import type { RoomConfig } from '../../types';

export default function RoomCards({ rooms, outputs }: { rooms: RoomConfig[]; outputs: boolean[] }) {
  return <div className="destination-panel"><div className="panel-title"><span>Destinations</span><span>{outputs.filter(Boolean).length} / 4 HIGH</span></div><div className="room-cards">{rooms.map((room,index)=><article className={`room-card ${outputs[index] ? 'active' : ''}`} key={room.id}><span className="room-index">0{room.id+1}</span><div><b>{room.name}</b><small>{room.output.replace('Y','Y₈').replace('Y₈','Y'+room.id)} · Address {room.address}</small></div><output>{outputs[index] ? 'HIGH':'LOW'}</output></article>)}</div></div>;
}
