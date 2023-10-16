import React, { useEffect, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Button } from '@material-tailwind/react';
import { Input } from '@material-tailwind/react';

interface Props {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

const NewPostcode = ({ register }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { onChange: onZonecodeChange, ...zonecodeRest } = register('zonecode');
  const { onChange: onPostcodeChange, ...postcodeRest } = register('postcode');
  const [postcode, setPostcode] = useState('');
  const [zonecode, setZonecode] = useState('');
  const [detailPostcode, setDetailPostcode] = useState('');

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    onPostcodeChange({ target: { value: fullAddress, name: 'postcode' } });

    onZonecodeChange({ target: { value: data.zonecode, name: 'zonecode' } });
    setPostcode(fullAddress);
    setZonecode(data.zonecode);
  };

  const onChangeDetailPostcode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailPostcode(e.target.value);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-2 border rounded-lg p-5">
      <div className="space-x-1 flex items-center">
        <Input
          type="text"
          label="우편번호"
          {...register('zonecode')}
          className=""
          crossOrigin="anonymous"
          disabled
          value={zonecode}
        />
        <Button type="button" className="bg-[#0067AC] h-10 w-24" onClick={handleClick}>
          찾기
        </Button>
      </div>
      <div className="gap-1 flex flex-col">
        <Input
          className=""
          type="text"
          label="주소"
          {...register('postcode')}
          crossOrigin="anonymous"
          disabled
          value={postcode}
        />
        <Input
          className=""
          type="text"
          label="상세주소"
          maxLength={20}
          {...register('detailPostcode')}
          onChange={(e) => onChangeDetailPostcode(e)}
          crossOrigin="anonymous"
        />
      </div>
      {zonecode && (
        <div className="text-xs text-gray-500">
          [{zonecode}] {postcode}, <br />
          {detailPostcode}
        </div>
      )}
      {isModalOpen && <DaumPostcodeEmbed className=" " onComplete={handleComplete} />}
    </div>
  );
};

export default NewPostcode;
