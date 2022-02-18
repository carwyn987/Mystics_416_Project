import * as React from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonsMultiple() {
  const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  return (
    <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
      orientation='vertical'
    >
      <ToggleButton style={{backgroundColor:'white'}}value="bold" aria-label="bold">
        Congressional Districts
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic">
        Counties
      </ToggleButton>
      <ToggleButton value="underlined" aria-label="underlined">
        Precincts
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
