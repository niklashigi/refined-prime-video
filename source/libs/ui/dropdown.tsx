import {h} from 'dom-chef'

/**
 * Creates a dropdown element that uses Amazon's CSS and therefore nicely fits
 * into its UI without looking out of place.
 *
 * @param name The `name` attribute of the inserted `<select>` element
 * @param options An array of the selectable values and their display names
 * @param selectedValue The currently selected value
 * @param title The `title` attribute of the dropdown
 */
export default function createDropdown(
  name: string,
  options: [string, string][],
  selectedValue: string,
  title: string = '',
) {
  const selectId = `rpv-setting-${name}`

  const select = (
    <select id={selectId} name={name} tabindex='-1' class='a-native-dropdown'>
      {
        options.map(([value, label]) => (
          <option value={value} {...(value === selectedValue ? { selected: '' } : {})}>
            {label}
          </option>
        ))
      }
    </select>
  ) as HTMLSelectElement

  const dropdownText = (
    <span id='selector-text' class='a-dropdown-prompt'>
      {options.filter(([value]) => value === selectedValue)[0][1]}
    </span>
  ) as HTMLSpanElement

  let shouldDispatch = false
  const observer = new MutationObserver(() => {
    if (shouldDispatch) {
      select.dispatchEvent(new Event('change', { bubbles: true }))
    }
    shouldDispatch = !shouldDispatch
  })
  observer.observe(dropdownText, {
    characterData: true,
    childList: true,
  })

  return (
    <div class='a-dropdown-container' title={title}>
      {select}
      <span tabindex='-1' class='a-button a-button-dropdown'>
        <span class='a-button-inner'>
          <span
            class='a-button-text a-declarative'
            data-action='a-dropdown-button' role='button'
            tabindex='0' aria-hidden='true' aria-pressed='false'
          >
            {dropdownText}
          </span>
          <i class='a-icon a-icon-dropdown'></i>
        </span>
      </span>
    </div>
  )
}
