import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pawn from '../../Pieces/Pawn';
import Knight from '../../Pieces/Knight';
import Bishop from '../../Pieces/Bishop';
import Rook from '../../Pieces/Rook';
import Queen from '../../Pieces/Queen';

const CapturedPiece = () => {
  const gameAnalyzer = useSelector(state => state.MultiPlayer.gameAnalyzer);
  const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);
  const oppositionPlayer = boardOrientation === 'white' ? 'b' : 'w';

  const [capturedPieces, setCapturedPieces] = useState({
    p: [],
    n: [],
    b: [],
    r: [],
    q: [],
  });

  useEffect(() => {
    const newCapturedPieces = { p: [], n: [], b: [], r: [], q: [] };
  
    gameAnalyzer.forEach(item => {
      if (item.captured && Array.isArray(item.captured)) {
        item.captured.forEach(capturedPiece => {
          if (capturedPiece.color === oppositionPlayer) {
            newCapturedPieces[capturedPiece.type].push(capturedPiece.color);
          }
        });
      } else if (item.captured && item.captured.color === oppositionPlayer) {
        newCapturedPieces[item.captured.type].push(item.captured.color);
      }
    });
  
    setCapturedPieces(newCapturedPieces);
  }, [gameAnalyzer, oppositionPlayer]);  

  return (
    <div className="flex flex-row flex-wrap gap-3">
      {capturedPieces.p.length > 0 && (
        <div className='flex flex-row flex-wrap relative'>
          {capturedPieces.p.map((color, index) => (
            <div key={index} className='relative' style={{ marginRight: '-12px' }}>
              <Pawn color={color} />
            </div>
          ))}
        </div>
      )}
      {capturedPieces.n.length > 0 && (
        <div className='flex flex-row flex-wrap relative'>
          {capturedPieces.n.map((color, index) => (
            <div key={index} className='relative' style={{ marginRight: '-12px' }}>
              <Knight key={index} color={color} />
            </div>
          ))}
        </div>
      )}
      {capturedPieces.b.length > 0 && (
        <div className='flex flex-row flex-wrap relative'>
          {capturedPieces.b.map((color, index) => (
            <div key={index} className='relative' style={{ marginRight: '-12px' }}>
              <Bishop key={index} color={color} />
            </div>
          ))}
        </div>
      )}
      {capturedPieces.r.length > 0 && (
        <div className='flex flex-row flex-wrap relative'>
          {capturedPieces.r.map((color, index) => (
            <div key={index} className='relative' style={{ marginRight: '-12px' }}>
              <Rook key={index} color={color} />
            </div>
          ))}
        </div>
      )}
      {capturedPieces.q.length > 0 && (
        <div className='flex flex-row flex-wrap relative'>
          {capturedPieces.q.map((color, index) => (
            <div key={index} className='relative' style={{ marginRight: '-12px' }}>
              <Queen key={index} color={color} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CapturedPiece;
