import { useState, useEffect } from 'react';
import Select from 'react-select';
import { AiOutlineCloudSync } from 'react-icons/ai';
import { Flex, FormLabel, Icon, Spinner, useToast } from '@chakra-ui/react';
import { StatusEnumTypes } from '../../Types/StatusEnumTypes';
import { toastNotify } from '../../utils/toastNotify';

type InformationSelectProps = {
  name: string;
  options: any[];
  defaultValue?: any;
  closeMenuOnSelect?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  helpText?: string;
  onChange: (e?: any) => void | any;
};

export const InformationSelect = ({
  name,
  options,
  defaultValue = null,
  closeMenuOnSelect = true,
  isClearable = false,
  isDisabled = false,
  placeholder = "",
  onChange,
}: InformationSelectProps) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Select
      name={name}
      defaultValue={value}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      isClearable={isClearable}
      closeMenuOnSelect={closeMenuOnSelect}
      isDisabled={isDisabled}
    />
  );
};