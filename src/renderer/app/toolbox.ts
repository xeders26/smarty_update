/*================    
  src/renderer/app/toolbox.ts
=================*/
import * as Blockly from 'blockly'

const customBlocksData: any[] = JSON.parse(localStorage.getItem('myCustomBlocks') || '[]')
customBlocksData.forEach((data) => {
  const blockDef: any = { type: data.id, message0: data.text, colour: data.color }
  if (data.type === 'statement') {
    blockDef.previousStatement = null
    blockDef.nextStatement = null
  } else {
    blockDef.output = null
  }
  Blockly.Blocks[data.id] = {
    init: function () {
      this.jsonInit(blockDef)
    }
  }
  ;(Blockly.Generator as any).forBlock = (Blockly.Generator as any).forBlock || Object.create(null)
  ;(Blockly.Generator as any).forBlock[data.id] = function (_b: any) {
    if (data.type === 'statement') return `  ${data.code}\n`
    return [`${data.code}`, 0]
  }
})

function normalizeCategoryId(name: string) {
  const allowed = /[A-Za-z0-9\u3131-\u318E\uAC00-\uD7A3]/
  const normalized = Array.from(name)
    .map((ch) => (allowed.test(ch) ? ch : '_'))
    .join('')
  return (
    'category_' +
    normalized
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '')
      .toLowerCase()
  )
}

function ensureCategoryIds(toolbox: any) {
  if (!toolbox || !Array.isArray(toolbox.contents)) return toolbox
  toolbox.contents.forEach((item: any) => {
    if (item.kind === 'category') {
      item.id = item.id || normalizeCategoryId(item.name || 'category')
      if (Array.isArray(item.contents)) ensureCategoryIds(item)
    }
  })
  return toolbox
}

function getBaseToolbox() {
  return {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: '스마티',
        colour: '230',
        contents: [
          { kind: 'block', type: 'smarty_begin' },
          { kind: 'block', type: 'smarty_get_battery' },
          {
            kind: 'block',
            type: 'arduino_serial_print',
            inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'Hello!' } } } }
          },
          { kind: 'block', type: 'arduino_serial_available' },
          { kind: 'block', type: 'arduino_serial_read' },
        ]
      },
      { kind: 'sep', gap: 50 },
      {
        kind: 'category',
        id: normalizeCategoryId('명령 흐름'),
        name: '명령 흐름',
        colour: '60',
        contents: [
          { kind: 'block', type: 'controls_if' },
          { kind: 'block', type: 'controls_if', extraState: { hasElse: true } },
          { kind: 'block', type: 'controls_if', extraState: { elseIfCount: 1, hasElse: true } },
          { kind: 'block', type: 'logic_compare' },
          { kind: 'block', type: 'logic_operation' },
          { kind: 'block', type: 'controls_repeat_ext' },
          { kind: 'block', type: 'controls_whileUntil' }
        ]
      },
      {
        kind: 'category',
        name: '기다리기',
        colour: '45',
        contents: [
          {
            kind: 'block',
            type: 'arduino_delay',
            inputs: { MS: { shadow: { type: 'math_number', fields: { NUM: 1000 } } } }
          },
          { kind: 'block', type: 'smarty_wait' },
          { kind: 'block', type: 'smarty_wait_until' },
          { kind: 'block', type: 'smarty_wait_compare', fields: { OP: 'LT' },          inputs: {
            B: { shadow: { type: 'math_number', fields: { NUM: 500 } } }
          } },
          { kind: 'block', type: 'smarty_wait_compare', fields: { OP: 'LTE' },          inputs: {
            B: { shadow: { type: 'math_number', fields: { NUM: 500 } } }
          } },
          { kind: 'block', type: 'smarty_wait_compare', fields: { OP: 'GT' },          inputs: {
            B: { shadow: { type: 'math_number', fields: { NUM: 500 } } }
          } },
          { kind: 'block', type: 'smarty_wait_compare', fields: { OP: 'GTE' },          inputs: {
            B: { shadow: { type: 'math_number', fields: { NUM: 500 } } }
          } },
          { kind: 'block', type: 'smarty_wait_compare', fields: { OP: 'EQ' },          inputs: {
            B: { shadow: { type: 'math_number', fields: { NUM: 500 } } }
          } },
          { kind: 'block', type: 'smarty_wait_compare', fields: { OP: 'NEQ' }, inputs: {
            B: { shadow: { type: 'math_number', fields: { NUM: 500 } } }
          } },
          {
            kind: 'block',
            type: 'wait_until_text_different',
            inputs: {
              TEXT_B: { shadow: { type: 'text', fields: { TEXT: 'A' } } }
            }
          },
          {
            kind: 'block',
            type: 'wait_until_text_same',
            inputs: {
              TEXT_B: { shadow: { type: 'text', fields: { TEXT: 'A' } } }
            }
          }
        ]
      },
      {
        kind: 'category',
        name: '수학',
        colour: '%{BKY_MATH_HUE}',
        contents: [
          { kind: 'block', type: 'math_number' },
          { kind: 'block', type: 'math_arithmetic' },
          {
            kind: 'block',
            type: 'smarty_math_in_range',
            inputs: {
              MIN: { shadow: { type: 'math_number', fields: { NUM: 10 } } },
              MAX: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
            }
          },
          { 
            kind: 'block', type: 'math_random_int',            
            inputs: {
              FROM: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
              TO: { shadow: { type: 'math_number', fields: { NUM: 100 } } }
            }
          },
          {
            kind: 'block',
            type: 'arduino_math_minmax'
          },
          {
            kind: 'block',
            type: 'arduino_math_abs'
          },
          {
            kind: 'block',
            type: 'arduino_math_map',
            inputs: {
              FROMLOW: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
              FROMHIGH: { shadow: { type: 'math_number', fields: { NUM: 1023 } } },
              TOLOW: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
              TOHIGH: { shadow: { type: 'math_number', fields: { NUM: 255 } } }
            }
          }
        ]
      },
      {
        kind: 'category',
        name: '문자',
        colour: '%{BKY_TEXTS_HUE}',
        contents: [
          { kind: 'block', type: 'text' },
          { kind: 'block', type: 'text_join' },
          { kind: 'block', type: 'smarty_text_contains', inputs: {} },
          { kind: 'block', type: 'smarty_text_equals', inputs: {} }
        ]
      },
      {
        kind: 'category',
        name: '정보',
        colour: '%{BKY_VARIABLES_HUE}',
        contents:[]
      },
      {
        kind: 'category',
        name: '함수',
        colour: '#995ba5',
        custom: 'PROCEDURE'
      },
      { kind: 'sep', gap: 50 },
      {
        kind: 'category',
        name: 'DC모터 / 이동',
        colour: '230',
        contents: [
          {
            kind: 'block',
            type: 'mecanumDrive',
            inputs: { SPD: { shadow: { type: 'math_number', fields: { NUM: 150 } } } }
          },
          {
            kind: 'block',
            type: 'runDcMotor',
            inputs: { SPD: { shadow: { type: 'math_number', fields: { NUM: 150 } } } }
          },
          {
            kind: 'block',
            type: 'runDcMotor_acc',
            inputs: {
              START: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
              FINAL: { shadow: { type: 'math_number', fields: { NUM: 255 } } },
              STEP: { shadow: { type: 'math_number', fields: { NUM: 5 } } },
              INTV: { shadow: { type: 'math_number', fields: { NUM: 10 } } }
            }
          },
          { kind: 'block', type: 'reverseMotor' },
          { kind: 'block', type: 'stopMotor' },
          { kind: 'block', type: 'waitAccDecMotor' }
        ]
      },
      {
        kind: 'category',
        name: '서보 모터',
        colour: '180',
        contents: [
          {
            kind: 'block',
            type: 'smarty_servo',
            inputs: {
              ANGLE: { shadow: { type: 'math_number', fields: { NUM: 90 } } }
            }
          },
          {
            kind: 'block',
            type: 'runServo',
            inputs: {
              DEG: { shadow: { type: 'math_number', fields: { NUM: 90 } } }
            }
          },
          {
            kind: 'block',
            type: 'slowServo',
            inputs: {
              START: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
              FINAL: { shadow: { type: 'math_number', fields: { NUM: 180 } } },
              STEP: { shadow: { type: 'math_number', fields: { NUM: 1 } } },
              INTERVAL: { shadow: { type: 'math_number', fields: { NUM: 15 } } }
            }
          },
          { kind: 'block', type: 'offServo' },
          {
            kind: 'block',
            type: 'setupServo',
            inputs: {
              DEG0: { shadow: { type: 'math_number', fields: { NUM: 500 } } },
              DEG180: { shadow: { type: 'math_number', fields: { NUM: 2500 } } }
            }
          }
        ]
      },
      {
        kind: 'category',
        name: 'LED / 스위치',
        colour: '60',
        contents:[
          { kind: 'block', type: 'smarty_led' },
          {
            kind: 'block',
            type: 'smarty_led_blink',
            inputs: {
              ON_T: { shadow: { type: 'math_number', fields: { NUM: 500 } } },
              OFF_T: { shadow: { type: 'math_number', fields: { NUM: 500 } } },
              CNT: { shadow: { type: 'math_number', fields: { NUM: 5 } } }
            }
          },
          { kind: 'block', type: 'readSw' },
          { kind: 'block', type: 'getSw' },
          { kind: 'block', type: 'smarty_switch_wait' },
          { kind: 'block', type: 'turnBumpLED' },
          { kind: 'block', type: 'smarty_bumper_red' },
          {
            kind: 'block',
            type: 'smarty_bumper_red_blink',
            inputs: {
              TIME: { shadow: { type: 'math_number', fields: { NUM: 500 } } }
            }
          },
          {
            kind: 'block',
            type: 'smarty_bumper_blink',
            inputs: {
              TIME: { shadow: { type: 'math_number', fields: { NUM: 500 } } }
            }
          },
          { kind: 'block', type: 'smarty_bumper_all_off' }
        ]
      },
      {
        kind: 'category',
        name: '센서',
        colour: '60',
        contents: [
          { kind: 'block', type: 'smarty_switch' },
          { kind: 'block', type: 'smarty_sensor' },
          { kind: 'block', type: 'smarty_adv_sensor_init' },
          { kind: 'block', type: 'smarty_adv_sensor_read' },
          { kind: 'block', type: 'smarty_gyro_action' },
          { kind: 'block', type: 'initBump' },
          { kind: 'block', type: 'smarty_bumper_read' },
          { kind: 'block', type: 'findBumpLine' },
          { kind: 'block', type: 'findBumpObject' },
          { kind: 'block', type: 'getBumpDistance' },
          { kind: 'block', type: 'getBumpLine' }
        ]
      },
      {
        kind: 'category',
        name: '입력 & 출력',
        colour: '210',
        contents: [
          { kind: 'block', type: 'arduino_pin_mode' },
          { kind: 'block', type: 'arduino_digital_write' },
          { kind: 'block', type: 'arduino_digital_read' },
          {
            kind: 'block',
            type: 'arduino_analog_write',
            inputs: { VAL: { shadow: { type: 'math_number', fields: { NUM: 128 } } } }
          },
          { kind: 'block', type: 'arduino_analog_read' },
          { kind: 'block', type: 'getAdc' },
          {
            kind: 'block',
            type: 'waitUntilAdc',
            inputs: {
              VAL: { shadow: { type: 'math_number', fields: { NUM: 500 } } }
            }
          },
          { kind: 'block', type: 'readDIO' }
        ]
      },
      {
        kind: 'category',
        name: '타이머',
        colour: '210',
        contents: [
          { kind: 'block', type: 'arduino_timer' },
          { kind: 'block', type: 'smarty_timer' }
        ]
      },
      {
        kind: 'category',
        name: '블루투스',
        colour: '290',
        contents: [
          { kind: 'block', type: 'turnBt' },
          { kind: 'block', type: 'availableBt' },
          { kind: 'block', type: 'smarty_bt_wait_cmd' },
          { kind: 'block', type: 'smarty_bt_wait_val' },
          { 
            kind: 'block', 
            type: 'smarty_bt_send_int',
            inputs: { VALUE: { shadow: { type: 'math_number', fields: { NUM: 0 } } } }
          },
          { 
            kind: 'block', 
            type: 'smarty_bt_send_string',
            inputs: { TEXT: { shadow: { type: 'text', fields: { TEXT: 'Hello' } } } }
          },
          { 
            kind: 'block', 
            type: 'smarty_bt_read_int',
            inputs: { BYTES: { shadow: { type: 'math_number', fields: { NUM: 1 } } } }
          },
          { 
            kind: 'block', 
            type: 'smarty_bt_read_string',
            inputs: { BYTES: { shadow: { type: 'math_number', fields: { NUM: 1 } } } }
          },
          { kind: 'block', type: 'getStateBt' },
          { kind: 'block', type: 'getByteBt' },
          { 
            kind: 'block', 
            type: 'smarty_p2p_setup_master',
            inputs: { PIN: { shadow: { type: 'text', fields: { TEXT: '7777' } } } }
          },
          { 
            kind: 'block', 
            type: 'smarty_p2p_setup_slave',
            inputs: { PIN: { shadow: { type: 'text', fields: { TEXT: '7777' } } } }
          },
          { 
            kind: 'block', 
            type: 'smarty_p2p_send',
            inputs: { MSG: { shadow: { type: 'text', fields: { TEXT: 'GO' } } } }
          },
          { kind: 'block', type: 'smarty_p2p_read' }
        ]
      },
      {
        "kind": "category",
        "name": "로봇",
        "colour": "#FF6680",
        "contents": [
          { "kind": "block", "type": "moveBlueHand" },
          { "kind": "block", "type": "moveRedHand" },
          { "kind": "block", "type": "moveBlueSlide" },
          { "kind": "block", "type": "moveRedSlide" }
        ]
      },
      { kind: 'sep', gap: 500 },
      {
        kind: 'category',
        id: normalizeCategoryId('📁 예제 모음'),
        name: '📁 예제 모음',
        custom: 'EXAMPLES_CATEGORY',
        colour: '#8e44ad'
      }
    ]
  }
}

function expandAllCategories(toolbox: any) {
  if (!toolbox || !Array.isArray(toolbox.contents)) return
  toolbox.contents.forEach((item: any) => {
    if (item.kind === 'category') {
      item.expanded = true
      if (Array.isArray(item.contents)) expandAllCategories(item)
    }
  })
}

export function getMergedToolbox() {
  const toolbox = ensureCategoryIds(getBaseToolbox())
  const customCategories: any = {}
  customBlocksData.forEach((data) => {
    if (!customCategories[data.category])
      customCategories[data.category] = { blocks: [], color: data.color }
    customCategories[data.category].blocks.push({ kind: 'block', type: data.id })
  })
  for (const catName in customCategories) {
    const existingCat = toolbox.contents.find(
      (c: any) => c.kind === 'category' && c.name === catName
    )
    if (existingCat) {
      if (!(existingCat as any).contents) (existingCat as any).contents = []
      ;(existingCat as any).contents.push(...customCategories[catName].blocks)
    } else {
      const newCategory = {
        kind: 'category',
        id: normalizeCategoryId(catName),
        name: catName,
        colour: customCategories[catName].color || '330',
        contents: customCategories[catName].blocks
      }
      let insertIndex = toolbox.contents.findIndex(
        (c: any) => c.name === '정보' || c.name === 'Variables'
      )
      if (insertIndex > 0 && toolbox.contents[insertIndex - 1].kind === 'sep') insertIndex--
      if (insertIndex === -1) insertIndex = toolbox.contents.length
      toolbox.contents.splice(insertIndex, 0, newCategory)
    }
  }
  expandAllCategories(toolbox)
  return toolbox
}

export function initCategorySidebar(workspace: any) {
  const sidebar = document.getElementById('category-sidebar')
  if (!sidebar) return
  sidebar.innerHTML = ''

  const rawToolbox = getMergedToolbox()
  const appThemeColors: Record<string, string[]> = {
    spring:['#FF4081','#FF9800','#FF5722','#4CAF50','#00BCD4','#9C27B0','#F44336','#8BC34A','#E91E63','#03A9F4'],
    summer:['#1E88E5','#43A047','#FDD835','#4ae0c2','#00ACC1','#f6e3ad','#81D4FA','#FFB300','#0288D1','#8BC34A'],
    winter:['#E53935','#00da07','#e51ec7','#02451b','#FBC02D','#D32F2F','#90CAF9','#388E3C','#838485','#FF8A65']
  }

  const getAppAutoSeason = () => {
    const month = new Date().getMonth() + 1
    if (month >= 3 && month <= 5) return 'spring'
    if (month >= 6 && month <= 8) return 'summer'
    if (month >= 9 && month <= 11) return 'autumn'
    return 'winter'
  }

  const getThemeColor = (index: number, defaultColor: string) => {
    let season = (window as any).__currentSeason
    if (!season || season === 'auto') season = getAppAutoSeason()
    if (season === 'autumn' || !appThemeColors[season]) return defaultColor
    return appThemeColors[season][index % appThemeColors[season].length]
  }

  const getThemeShades = (color: string) => {
    let r = 128, g = 128, b = 128
    if (color.startsWith('rgb')) {
      const match = color.match(/\d+/g)
      if (match && match.length >= 3) {
        r = parseInt(match[0], 10)
        g = parseInt(match[1], 10)
        b = parseInt(match[2], 10)
      }
    } else {
      const cleanHex = color.replace('#', '')
      if (cleanHex.length === 3) {
        r = parseInt(cleanHex[0] + cleanHex[0], 16) || 128
        g = parseInt(cleanHex[1] + cleanHex[1], 16) || 128
        b = parseInt(cleanHex[2] + cleanHex[2], 16) || 128
      } else {
        r = parseInt(cleanHex.substring(0, 2), 16) || 128
        g = parseInt(cleanHex.substring(2, 4), 16) || 128
        b = parseInt(cleanHex.substring(4, 6), 16) || 128
      }
    }
    const lighten = (val: number) => Math.min(255, Math.floor(val + (255 - val) * 0.6))
    const darken = (val: number) => Math.max(0, Math.floor(val * 0.6))
    return {
      base: `rgb(${r}, ${g}, ${b})`, light: `rgb(${lighten(r)}, ${lighten(g)}, ${lighten(b)})`,
      dark: `rgb(${darken(r)}, ${darken(g)}, ${darken(b)})`, shadow: `rgba(${r}, ${g}, ${b}, 0.5)`
    }
  }

  injectWaterdropCSS()

  let tooltipEl = document.getElementById('smarty-global-tooltip')
  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.id = 'smarty-global-tooltip'
    document.body.appendChild(tooltipEl)
  }

  let dynamicLabelStyleEl = document.getElementById('smarty-dynamic-labels')
  if (!dynamicLabelStyleEl) {
    dynamicLabelStyleEl = document.createElement('style')
    dynamicLabelStyleEl.id = 'smarty-dynamic-labels'
    document.head.appendChild(dynamicLabelStyleEl)
  }

  const smoothScrollTo = (flyout: any, targetY: number, duration: number = 450) => {
    const scrollbar = flyout.scrollbar
    const workspace_ = flyout.workspace_
    if (!scrollbar && !workspace_) return
    const startY = scrollbar ? scrollbar.get() : -workspace_.scrollY
    const distance = targetY - startY
    if (Math.abs(distance) < 1) return
    const startTime = performance.now()
    if (flyout.__scrollAnimId) cancelAnimationFrame(flyout.__scrollAnimId)
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      let progress = elapsed / duration
      if (progress > 1) progress = 1
      const currentY = startY + distance * easeInOutCubic(progress)
      if (scrollbar) {
        scrollbar.set(currentY)
      } else {
        workspace_.scrollY = -currentY
        workspace_.translate(workspace_.scrollX, workspace_.scrollY)
      }
      if (progress < 1) flyout.__scrollAnimId = requestAnimationFrame(animate)
    }
    flyout.__scrollAnimId = requestAnimationFrame(animate)
  }

  let dynamicCssRules = ''
  const flatContents: any[] =[]
  let categoryCount = 0

  const blockTypeToColor: Record<string, string> = {}
  const blockStyles: Record<string, any> = {}
  const categoryStyles: Record<string, any> = {}

  rawToolbox.contents.forEach((category: any) => {
    if (category.kind !== 'category') return
    const cleanName = category.name.replace(/^\s+|\s+$/g, '')
    const currentCategoryIndex = categoryCount

    const nameToHex: Record<string, string> = {
      논리: '#5b80a5', logic: '#5b80a5', 반복: '#5ba55b', loops: '#5ba55b', 수학: '#5b67a5', math: '#5b67a5',
      문자: '#5ba58c', text: '#5ba58c', 리스트: '#745ba5', lists: '#745ba5', 목록: '#745ba5', 색상: '#a5745b', colour: '#a5745b',
      색: '#a5745b', 정보: '#a55b80', variables: '#a55b80', 함수: '#995ba5', functions: '#995ba5'
    }
    const styleToHex: Record<string, string> = {
      logic_category: '#5b80a5', loop_category: '#5ba55b', math_category: '#5b67a5', text_category: '#5ba58c',
      list_category: '#745ba5', colour_category: '#a5745b', variable_category: '#a55b80', procedure_category: '#995ba5'
    }

    let defaultHex = category.colour || category.originalColor_ || category.color || category.hexColour
    const catStyle = category.categorystyle || category.originalStyle_ || ''

    if (styleToHex[catStyle]) defaultHex = styleToHex[catStyle]
    else if (nameToHex[cleanName.toLowerCase()]) defaultHex = nameToHex[cleanName.toLowerCase()]
    if (!defaultHex) defaultHex = '#888888'

    if (typeof defaultHex === 'string' && !defaultHex.startsWith('#') && !defaultHex.startsWith('rgb') && !isNaN(Number(defaultHex))) {
      const BAny = Blockly as any
      if (BAny.utils && BAny.utils.colour && typeof BAny.utils.colour.hueToHex === 'function') {
        defaultHex = BAny.utils.colour.hueToHex(Number(defaultHex))
      } else if (typeof BAny.hueToHex === 'function') {
        defaultHex = BAny.hueToHex(Number(defaultHex))
      }
    }

    const baseHexColor = getThemeColor(categoryCount, defaultHex)
    const shades = getThemeShades(baseHexColor)

    if (catStyle) {
      categoryStyles[catStyle] = { colour: baseHexColor }
      blockStyles[catStyle.replace('_category', '_blocks')] = { colourPrimary: baseHexColor }
    }

    dynamicCssRules += `.smarty-theme-label-${categoryCount} text, text.smarty-theme-label-${categoryCount} { fill: ${baseHexColor} !important; }`
    flatContents.push({ kind: 'label', text: `🚩 ${cleanName}`, 'web-class': `smarty-theme-label-${categoryCount} blockly-custom-label` })

    if (category.custom === 'VARIABLE' || cleanName === '정보' || cleanName === '변수' || cleanName === 'Variables') {
      flatContents.push({ kind: 'button', text: '🔢 정수 정보 만들기...', callbackKey: 'CREATE_VAR_INT', 'web-class': 'smarty-var-btn' })
      flatContents.push({ kind: 'button', text: '📊 실수 정보 만들기...', callbackKey: 'CREATE_VAR_FLOAT', 'web-class': 'smarty-var-btn' })
      flatContents.push({ kind: 'button', text: '🔤 문자 정보 만들기...', callbackKey: 'CREATE_VAR_CHAR', 'web-class': 'smarty-var-btn' })
      flatContents.push({ kind: 'button', text: '📝 문자열 정보 만들기...', callbackKey: 'CREATE_VAR_STRING', 'web-class': 'smarty-var-btn' })
      flatContents.push({ kind: 'button', text: '✅ 불리안 정보 만들기...', callbackKey: 'CREATE_VAR_BOOLEAN', 'web-class': 'smarty-var-btn' })

      blockStyles['variable_blocks'] = { colourPrimary: baseHexColor }
      categoryStyles['variable_category'] = { colour: baseHexColor }
      ;['smarty_variables_get', 'smarty_variables_set'].forEach((t) => (blockTypeToColor[t] = baseHexColor))
      dynamicCssRules += `.smarty-var-btn .blocklyFlyoutButtonBackground { fill: ${baseHexColor} !important; stroke: none !important; rx: 12px !important; ry: 12px !important; } .smarty-var-btn:hover .blocklyFlyoutButtonBackground { fill: ${baseHexColor} !important; filter: brightness(1.15) !important; } .smarty-var-btn text { fill: #ffffff !important; font-weight: 700 !important; }`
      
      let latestVarId: string | null = null;
      if (workspace) {
        // 구식 함수 대신 최신 getVariableMap() 사용
        const map = workspace.getVariableMap();
        const vars = map ? map.getAllVariables() : workspace.getAllVariables();
        const realVars = vars.filter((v: any) => v.name !== '선택' && v.name !== '항목' && v.name !== 'item');
        if (realVars.length > 0) {
          latestVarId = realVars[realVars.length - 1].getId(); 
        }
      }

      const setBlock: any = { kind: 'block', type: 'smarty_variables_set' };
      const getBlock: any = { kind: 'block', type: 'smarty_variables_get' };

      if (latestVarId) {
        setBlock.fields = { VAR: { id: latestVarId } };
        getBlock.fields = { VAR: { id: latestVarId } };
      }

      flatContents.push(setBlock);
      flatContents.push(getBlock);
    }

    if (category.custom === 'PROCEDURE' || cleanName === '함수' || cleanName === 'Functions') {
      flatContents.push({ kind: 'button', text: '함수 만들기...', callbackKey: 'CREATE_PROCEDURE_NO_RETURN', 'web-class': 'smarty-func-btn' });
      flatContents.push({ kind: 'button', text: '결과값 있는 함수 만들기...', callbackKey: 'CREATE_PROCEDURE_RETURN', 'web-class': 'smarty-func-btn' });

      if (workspace) {
        const topBlocks = workspace.getTopBlocks(false);
        const addedFuncs = new Set();
        topBlocks.forEach((block: any) => {
          if (block.type === 'procedures_defnoreturn' || block.type === 'procedures_defreturn') {
            const funcName = block.getFieldValue('NAME');
            if (funcName && !addedFuncs.has(funcName)) {
              addedFuncs.add(funcName);
              const isReturn = (block.type === 'procedures_defreturn');
              
              const args = block.getVars ? block.getVars() : (block.arguments_ || []);
              const extraState: any = { name: funcName };
              if (args && args.length > 0) {
                 extraState.params = args; 
              }

              flatContents.push({ 
                kind: 'block', 
                type: isReturn ? 'procedures_callreturn' : 'procedures_callnoreturn', 
                extraState: extraState 
              });
            }
          }
        });
      }

      blockStyles['procedure_blocks'] = { colourPrimary: baseHexColor };
      categoryStyles['procedure_category'] = { colour: baseHexColor };
      ;['procedures_defnoreturn','procedures_defreturn','procedures_mutatorcontainer','procedures_mutatorarg','procedures_callnoreturn','procedures_callreturn','procedures_ifreturn'].forEach((t) => (blockTypeToColor[t] = baseHexColor));
      dynamicCssRules += `.smarty-func-btn .blocklyFlyoutButtonBackground { fill: ${baseHexColor} !important; stroke: none !important; rx: 12px !important; ry: 12px !important; } .smarty-func-btn:hover .blocklyFlyoutButtonBackground { fill: ${baseHexColor} !important; filter: brightness(1.15) !important; } .smarty-func-btn text { fill: #ffffff !important; font-weight: 700 !important; }`;
    }

    const processNode = (node: any) => {
      if (node.kind === 'category') {
        if (node.contents) node.contents.forEach(processNode)
      } else if (node.kind === 'block' || node.kind === 'button' || node.kind === 'label') {
        flatContents.push(node)
        if (node.kind === 'block') {
          const searchDeepTypes = (obj: any, isTopLevel: boolean) => {
            if (!obj || typeof obj !== 'object') return
            if (obj.type && typeof obj.type === 'string') {
              if (isTopLevel || !blockTypeToColor[obj.type]) blockTypeToColor[obj.type] = baseHexColor
            }
            Object.keys(obj).forEach((key) => searchDeepTypes(obj[key], false))
          }
          searchDeepTypes(node, true)
        }
      }
    }

    if (category.contents) category.contents.forEach(processNode)

    // 🚨 [추가됨] 이 카테고리가 '예제'인지 확인합니다.
    const isExampleCategory = category.custom === 'EXAMPLES_CATEGORY' || cleanName.includes('예제');

    const chip = document.createElement('button')
    chip.type = 'button'
    // 🚨 예제 버튼이면 동그란 물방울 대신 'example-folder-btn' 모양을 씌웁니다.
    chip.className = isExampleCategory ? 'smarty-category-btn example-folder-btn' : 'smarty-category-btn waterdrop-chip'
    chip.setAttribute('data-category-name', cleanName)
    chip.style.setProperty('--glass-base', shades.base)


    chip.style.setProperty('--glass-light', shades.light)
    chip.style.setProperty('--glass-dark', shades.dark)
    chip.style.setProperty('--glass-shadow', shades.shadow)
    const icon = document.createElement('span')
    icon.className = 'chip-icon'
    icon.innerHTML = getCategorySvgIcon(cleanName)
    chip.appendChild(icon)

    const handleFocusCategory = () => {
      if (tooltipEl) {
        const rect = chip.getBoundingClientRect()
        tooltipEl.textContent = cleanName
        tooltipEl.style.left = `${rect.right + 12}px`
        tooltipEl.style.top = `${rect.top + rect.height / 2}px`
        tooltipEl.style.opacity = '1'
        tooltipEl.style.visibility = 'visible'
      }

      const catName = category.name || '';
      const isExample = category.custom === 'EXAMPLES_CATEGORY' || catName.includes('예제');
      if (isExample) {
        if (typeof (window as any).openExplorerWindow === 'function') (window as any).openExplorerWindow();
        return; 
      } else {
        if (typeof (window as any).closeExplorerWindow === 'function') (window as any).closeExplorerWindow();
      }

      const flyout = workspace.getFlyout()
      if (flyout) {
        let targetY = -1
        const labelGroup = document.querySelector(`.smarty-theme-label-${currentCategoryIndex}`)
        if (labelGroup) {
          const transform = labelGroup.getAttribute('transform')
          if (transform) {
            const match = transform.match(/translate\([\d.-]+,\s*([\d.-]+)\)/)
            if (match) targetY = parseFloat(match[1])
          }
        }
        if (targetY === -1) {
          const btnList = (flyout as any).buttons_ || (flyout as any).mats_ ||[]
          for (const item of btnList) {
            const btnObj = item.button || item
            if (btnObj && btnObj.text_ && btnObj.text_.includes(`🚩 ${cleanName}`)) {
              targetY = btnObj.position_ ? btnObj.position_.y : item.pos ? item.pos.y : -1
              break
            }
          }
        }
        if (targetY !== -1) {
          const scale = flyout.workspace_?.scale || 1
          const scrollPos = Math.max(0, targetY * scale - 15)
          smoothScrollTo(flyout, scrollPos, 450)
        }
      }
      document.querySelectorAll('.smarty-category-btn').forEach((btn) => btn.classList.remove('selected'))
      chip.classList.add('selected')
    }

    chip.addEventListener('mouseenter', handleFocusCategory)
    chip.addEventListener('click', handleFocusCategory)
    chip.addEventListener('mouseleave', () => {
      if (!tooltipEl) return
      tooltipEl.style.opacity = '0'
      tooltipEl.style.visibility = 'hidden'
    })

    sidebar.appendChild(chip)
    categoryCount += 1
  })

  dynamicLabelStyleEl.innerHTML = dynamicCssRules

  // ==========================================================
  // 🚨 [가장 안전한 버튼 콜백 등록 방식]
  // 이미 등록된 콜백이면 등록 안 함 (에러 발생 원천 차단)
  // ==========================================================
  const registerVarCreator = (key: string, type: string, title: string) => {
    if (!workspace.getButtonCallback(key)) {
      workspace.registerButtonCallback(key, () => {
        const promptFunc = (Blockly.dialog && Blockly.dialog.prompt) 
          ? (msg: string, def: string, cb: any) => Blockly.dialog.prompt(msg, def, cb) 
          : (msg: string, def: string, cb: any) => cb(prompt(msg, def));
        
        promptFunc(title, '', (name: string) => {
          if (!name) return;
          if (type === 'string_array') {
            setTimeout(() => {
              promptFunc(`[ ${name} ] 문자열의 최대 길이(배열 크기)를 숫자로 입력하세요. (예: 20)`, '20', (len: string) => {
                const size = parseInt(len, 10) || 20;
                workspace.createVariable(name, `char[${size}]`); 
              });
            }, 100);
          } else {
            workspace.createVariable(name, type);
          }
        });
      });
    }
  };

  registerVarCreator('CREATE_VAR_INT', 'int', '새로운 정수 정보의 이름을 입력하세요:');
  registerVarCreator('CREATE_VAR_FLOAT', 'float', '새로운 실수 정보의 이름을 입력하세요:');
  registerVarCreator('CREATE_VAR_CHAR', 'char', '새로운 문자 정보의 이름을 입력하세요:');
  registerVarCreator('CREATE_VAR_STRING', 'string_array', '새로운 문자열 정보의 이름을 입력하세요:');
  registerVarCreator('CREATE_VAR_BOOLEAN', 'boolean', '새로운 불리안 정보의 이름을 입력하세요:');

  const registerFuncCreator = (key: string, blockType: string, promptText: string) => {
    if (!workspace.getButtonCallback(key)) {
      workspace.registerButtonCallback(key, (btn: any) => {
        const targetWorkspace = btn.getTargetWorkspace();
        const promptFunc = (Blockly.dialog && Blockly.dialog.prompt) 
          ? (msg: string, def: string, cb: any) => Blockly.dialog.prompt(msg, def, cb) 
          : (msg: string, def: string, cb: any) => cb(prompt(msg, def));

        promptFunc(promptText, '함수이름', (funcName: string) => {
          if (!funcName) return;
          const block = targetWorkspace.newBlock(blockType);
          block.setFieldValue(funcName, 'NAME');
          block.initSvg();
          block.render();
          try {
            const metrics = targetWorkspace.getMetrics();
            const x = metrics.viewLeft ? metrics.viewLeft + 100 : 100;
            const y = metrics.viewTop ? metrics.viewTop + 100 : 100;
            block.moveBy(x, y);
          } catch (e) { block.moveBy(100, 100); }
          block.select();
          
          if (!(window as any).__isUpdatingSidebar) {
             (window as any).__isUpdatingSidebar = true;
             setTimeout(() => {
                 const flyout = targetWorkspace.getFlyout();
                 const currentScroll = flyout && flyout.scrollbar ? flyout.scrollbar.get() : 0;
                 initCategorySidebar(targetWorkspace);
                 setTimeout(() => {
                    const newFlyout = targetWorkspace.getFlyout();
                    if (newFlyout && newFlyout.scrollbar) newFlyout.scrollbar.set(currentScroll);
                    (window as any).__isUpdatingSidebar = false;
                 }, 50);
             }, 100);
          }
        });
      });
    }
  };

  registerFuncCreator('CREATE_PROCEDURE_NO_RETURN', 'procedures_defnoreturn', '🛠️ 새로운 함수의 이름을 입력하세요:');
  registerFuncCreator('CREATE_PROCEDURE_RETURN', 'procedures_defreturn', '🔄 결과값이 있는 새로운 함수의 이름을 입력하세요:');
  
  // 🚨 콜백 등록이 무사히 끝나야 아래 updateToolbox가 정상 실행됨!
  workspace.updateToolbox({ kind: 'flyoutToolbox', contents: flatContents })

  const flyout = workspace.getFlyout()
  if (flyout && flyout.svgGroup_ && !(flyout as any).__hoverZIndexPatched) {
    flyout.svgGroup_.addEventListener('mouseover', (e: any) => {
      const targetGroup = e.target.closest('.blocklyDraggable')
      if (targetGroup && targetGroup.closest('.blocklyBlockCanvas')) {
        if (targetGroup.parentNode && targetGroup.parentNode.lastElementChild !== targetGroup) {
          targetGroup.parentNode.appendChild(targetGroup)
        }
        const blockId = targetGroup.getAttribute('data-id')
        if (blockId && typeof flyout.getWorkspace === 'function') {
          const fWs = flyout.getWorkspace()
          const block = fWs.getBlockById(blockId)
          if (block && block.type) {
            if (typeof (window as any).showSmartyHelp === 'function') {
              ;(window as any).showSmartyHelp(block.type)
            }
          }
        }
      }
    })
    flyout.svgGroup_.addEventListener('mouseout', (e: any) => {
      const targetGroup = e.target.closest('.blocklyDraggable')
      const relatedTarget = e.relatedTarget as Element
      if (targetGroup && (!relatedTarget || !targetGroup.contains(relatedTarget))) {
        if (typeof (window as any).hideSmartyHelp === 'function') { (window as any).hideSmartyHelp(); }
      }
    })
    ;(flyout as any).__hoverZIndexPatched = true
  }

  try {
    const themeName = 'smarty_season_' + Date.now()
    let newTheme: any
    if (typeof Blockly.Theme !== 'undefined') {
      if ((Blockly.Theme as any).defineTheme) {
        newTheme = (Blockly.Theme as any).defineTheme(themeName, {
          base: (Blockly.Themes as any)?.Classic,
          blockStyles: blockStyles,
          categoryStyles: categoryStyles
        })
      } else {
        newTheme = new Blockly.Theme(themeName, blockStyles, categoryStyles)
      }
      workspace.setTheme(newTheme)
    }
  } catch (e) {}

  ;(window as any).__smartyBlockColors = blockTypeToColor
  const forceApplyColor = (block: any) => {
    if (!block || block.isShadow()) return
    const themeHex = blockTypeToColor[block.type]
    if (themeHex && typeof block.setColour === 'function') block.setColour(themeHex)
  }

  const colorAllBlocks = () => {
    workspace.getAllBlocks(false).forEach(forceApplyColor)
    if (flyout && typeof flyout.getWorkspace === 'function') {
      const fWs = flyout.getWorkspace()
      if (fWs) fWs.getAllBlocks(false).forEach(forceApplyColor)
    }
  }
  Promise.resolve().then(colorAllBlocks);

  if (!(window as any).__smartyColorListener) {
    workspace.addChangeListener((e: any) => {
      if (e.type === 'create' || e.type === 'change') {
        const block = workspace.getBlockById(e.blockId)
        if (block && !block.isShadow()) {
          const colors = (window as any).__smartyBlockColors
          if (colors && colors[block.type]) block.setColour(colors[block.type])
        }
      }
    })
    ;(window as any).__smartyColorListener = true
  }

  if (!(window as any).__smartyResizeListenerInstalled) {
    window.addEventListener('resize', () => {
      if (flyout && typeof flyout.reflow === 'function') flyout.reflow()
    })
    ;(window as any).__smartyResizeListenerInstalled = true
  }

  if (!(window as any).__categorySidebarThemeListenerInstalled) {
    window.addEventListener('appThemeChanged', () => initCategorySidebar(workspace))
    ;(window as any).__categorySidebarThemeListenerInstalled = true
  }

  if (!(window as any).__smartyProcRefreshListener) {
    workspace.addChangeListener((e: any) => {
      if (e.workspaceId !== workspace.id) return;
      if (e.isUiEvent) return; 

      let isFuncEvent = false;

      if (e.type === Blockly.Events.BLOCK_CREATE || e.type === Blockly.Events.BLOCK_CHANGE) {
        const block = workspace.getBlockById(e.blockId);
        if (block && block.type && block.type.startsWith('procedures_def')) {
           isFuncEvent = true;
        }
      } 
      else if (e.type === Blockly.Events.BLOCK_DELETE) {
        if (e.oldJson && e.oldJson.type && e.oldJson.type.startsWith('procedures_def')) {
           isFuncEvent = true;
        } else if (e.oldXml && e.oldXml.tagName) {
           const typeAttr = e.oldXml.getAttribute('type');
           if (typeAttr && typeAttr.startsWith('procedures_def')) {
               isFuncEvent = true;
           }
        }
      }

      if (e.type === 'var_create' || e.type === 'var_delete' || e.type === 'var_rename') {
         isFuncEvent = true; 
      }

      if (isFuncEvent) {
         if (!(window as any).__isUpdatingSidebar) {
             (window as any).__isUpdatingSidebar = true;
             setTimeout(() => {
                 const flyout = workspace.getFlyout();
                 const currentScroll = flyout && flyout.scrollbar ? flyout.scrollbar.get() : 0;
                 initCategorySidebar(workspace);
                 setTimeout(() => {
                    const newFlyout = workspace.getFlyout();
                    if (newFlyout && newFlyout.scrollbar) newFlyout.scrollbar.set(currentScroll);
                    (window as any).__isUpdatingSidebar = false;
                 }, 50);
             }, 100); 
         }
      }
    });
    ;(window as any).__smartyProcRefreshListener = true;
  }

  if (!(window as any).__smartyConfigRefreshListener) {
    window.addEventListener('smartyConfigUpdated', (e: any) => {
      if (!(window as any).__isUpdatingSidebar) {
        (window as any).__isUpdatingSidebar = true;
        setTimeout(() => {
          const flyout = workspace.getFlyout();
          const currentScroll = flyout && flyout.scrollbar ? flyout.scrollbar.get() : 0;
          initCategorySidebar(workspace); 
          setTimeout(() => {
            const newFlyout = workspace.getFlyout();
            if (newFlyout && newFlyout.scrollbar) newFlyout.scrollbar.set(currentScroll);
            if (newFlyout && typeof newFlyout.getWorkspace === 'function') {
              const flyoutWorkspace = newFlyout.getWorkspace();
              const flyoutBlocks = flyoutWorkspace.getAllBlocks(false);
              const newSettings = e.detail || {}; 
              flyoutBlocks.forEach((block: any) => {
                if (['moveBlueHand', 'moveRedHand', 'moveBlueSlide', 'moveRedSlide'].includes(block.type)) {
                  const targetSetting = newSettings[block.type] || (window as any).blockSettings?.[block.type];
                  if (targetSetting) {
                    const minLabel = block.getField('MIN_LABEL');
                    if (minLabel) minLabel.setValue(String(targetSetting.min ?? 0));
                    const maxLabel = block.getField('MAX_LABEL');
                    if (maxLabel) maxLabel.setValue(String(targetSetting.max ?? 180));
                  }
                }
              });
            }
            (window as any).__isUpdatingSidebar = false;
          }, 150); 
        }, 100); 
      }
    });
    (window as any).__smartyConfigRefreshListener = true;
  }
}

function getCategorySvgIcon(categoryName: string): string {
  const icons: Record<string, string> = {
    '명령 흐름': '<path d="M10 2h4v4h-4zM4 16h4v4H4zM16 16h4v4h-4zM11 6h2v5h5v5h-2v-3H8v3H6v-5h5V6z"/>', 
    '논리': '<path d="M17 11v6l5-4-5-4v6H9v-6L4 13l5 4v-6h8z"/>',
    '반복': '<path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>',
    '기다리기': '<path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"/>', 
    '수학': '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>',
    '문자': '<path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"/>',
    '텍스트': '<path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"/>',
    '정보': '<path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>',
    '함수': '<path d="M2 20h8v-4h4v4h8V7l-5 2.5V7l-5 2.5V7L2 12v8z"/>', 
    '서보': '<path d="M12 18L6.5 8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="12" cy="18" r="3" fill="currentColor"/><path d="M4.5 14.5A9.5 9.5 0 0 1 19.5 14.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4"/>', 
    '모터': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-12.5l1.5 3.5 3.8.5-2.8 2.5 1 3.8-3.5-2.2-3.5 2.2 1-3.8-2.8-2.5 3.8-.5z"/>',
    '이동': '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 17c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm0-12.5l1.5 3.5 3.8.5-2.8 2.5 1 3.8-3.5-2.2-3.5 2.2 1-3.8-2.8-2.5 3.8-.5z"/>',
    '스위치': '<path d="M12 6v12c3.31 0 6-2.69 6-6s-2.69-6-6-6zm-2 1H4v2h6V7zm-2 4H2v2h6v-2zm2 4H4v2h6v-2z"/>',
    'LED': '<path d="M12 6v12c3.31 0 6-2.69 6-6s-2.69-6-6-6zm-2 1H4v2h6V7zm-2 4H2v2h6v-2zm2 4H4v2h6v-2z"/>',
    '센서': '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>', 
    '타이머': '<path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.53-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>',
    '블루투스': '<path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z"/>',
    '예제': '<path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>',
    '스마티': '<path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a5 5 0 0 1 5 5v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a5 5 0 0 1 5-5h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>',
    '로봇': '<path d="M12 2a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2zM5 5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H5zm2 2h10v8H7V7zm-2 11a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"/>'
  };
  const defaultIcon = '<path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/>';
  const matchedKey = Object.keys(icons).find((key) => categoryName.includes(key));
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${matchedKey ? icons[matchedKey] : defaultIcon}</svg>`;
}

function injectWaterdropCSS() {
  if (document.getElementById('waterdrop-sidebar-style')) return
  const style = document.createElement('style')
  style.id = 'waterdrop-sidebar-style'
  style.innerHTML = `
    .blocklyFlyoutBackground { fill: transparent !important; fill-opacity: 0 !important; stroke: none !important; }
    .blocklyFlyout > g { clip-path: none !important; }
    .blocklyFlyout .blocklyBlockCanvas > g.blocklyDraggable, .blocklyFlyout .blocklyBlockCanvas > g.blockly-custom-label, .blocklyFlyout .blocklyBlockCanvas > g.blocklyFlyoutButton { clip-path: polygon(-1000px -5000px, 250px -5000px, 250px 5000px, -1000px 5000px) !important; transition: clip-path 0.15s ease, filter 0.15s ease !important; cursor: pointer !important; }
    .blocklyFlyout .blocklyBlockCanvas > g.blocklyDraggable:hover, .blocklyFlyout .blocklyBlockCanvas > g.blockly-custom-label:hover, .blocklyFlyout .blocklyBlockCanvas > g.blocklyFlyoutButton:hover { clip-path: polygon(-1000px -5000px, 3000px -5000px, 3000px 5000px, -1000px 5000px) !important; filter: drop-shadow(4px 4px 10px rgba(0,0,0,0.5)) !important; }
    .blockly-custom-label text { font-weight: 900 !important; font-size: 13.5pt !important; }
    .blocklyToolboxDiv { display: none !important; }
    #category-sidebar { border-radius: 0 !important; width: 54px !important; min-width: 54px !important; max-width: 54px !important; padding: 10px 0 !important; background: transparent !important; border-right: none !important; margin-right: 0 !important; display: flex; flex-direction: column; align-items: center; overflow-x: hidden; z-index: 10; }
    .smarty-category-btn::before, .waterdrop-chip::before { content: none !important; display: none !important; }
    #category-sidebar .waterdrop-chip { position: relative; border-radius: 14px !important; opacity: 1 !important; filter: none !important; background: radial-gradient(circle at 30% 30%, var(--glass-light) 0%, var(--glass-base) 45%, var(--glass-dark) 100%) !important; box-shadow: inset 0px -4px 8px rgba(255, 255, 255, 0.4), inset 0px 4px 6px rgba(255, 255, 255, 0.3), 0px 6px 10px var(--glass-shadow) !important; margin: 1px auto !important; width: 38px !important; height: 38px !important; border: none !important; display: flex; align-items: center; justify-content: center; transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1) !important; outline: none; cursor: pointer; }
    #category-sidebar .waterdrop-chip::after { content: ''; position: absolute; top: 2px; left: 15%; width: 70%; height: 35%; background: linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%); border-radius: 10px 10px 16px 16px; pointer-events: none; z-index: 2; }
    #category-sidebar .waterdrop-chip:hover { transform: translateY(-2px) scale(1.05); box-shadow: inset 0px -8px 12px rgba(255, 255, 255, 0.6), inset 0px 4px 6px rgba(255, 255, 255, 0.3), 0px 10px 16px var(--glass-shadow) !important; }
    #category-sidebar .waterdrop-chip.selected { background: radial-gradient(circle at 30% 30%, var(--glass-light) 0%, var(--glass-base) 45%, var(--glass-dark) 100%) !important; box-shadow: inset 0px -4px 8px rgba(255, 255, 255, 0.4), inset 0px 4px 6px rgba(255, 255, 255, 0.3), 0px 0px 15px var(--glass-base), 0px 6px 15px var(--glass-shadow) !important; transform: scale(1.15); }
    #category-sidebar .waterdrop-chip .chip-icon { z-index: 3; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: #ffffff; }
    #category-sidebar .waterdrop-chip .chip-icon svg { width: 100% !important; height: 100% !important; fill: currentColor !important; filter: drop-shadow(0px 1px 2px rgba(0,0,0,0.3)); }
    #smarty-global-tooltip { position: fixed; transform: translateY(-50%); background: rgba(30, 30, 30, 0.85); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.1); font-size: 16px; font-weight: 700; white-space: nowrap; padding: 8px 14px; border-radius: 6px; box-shadow: 0px 4px 12px rgba(0,0,0,0.2); pointer-events: none; opacity: 0; visibility: hidden; z-index: 999999; transition: opacity 0.15s ease, visibility 0.15s ease; }

    /* 🚨 [신규 추가] 예제 모음 전용 버튼 스타일 (위쪽 여백, 구분선 및 사각형 폴더 모양) */
    #category-sidebar .example-folder-btn {
      position: relative;
      margin-top: 36px !important; /* 위쪽 블록들과 넓은 여백 띄우기 */
      margin-bottom: 12px !important;
      width: 44px !important;
      height: 38px !important;
      border-radius: 10px !important; /* 깔끔한 직사각형 폴더 느낌 */
      
      /* 🌟 계절 테마의 기본 색상(--glass-base)을 활용하여 은은하게 적용! */
      background: linear-gradient(135deg, var(--glass-light), var(--glass-dark)) !important;
      opacity: 0.8; /* 평소에는 살짝 투명하게 */
      border: 1px solid rgba(255, 255, 255, 0.4) !important;
      box-shadow: 0 4px 10px var(--glass-shadow) !important;
      
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
      outline: none;
      cursor: pointer;
    }
    
    /* 버튼 위쪽에 은은한 가로 구분선 추가 */
    #category-sidebar .example-folder-btn::before {
      content: '';
      position: absolute;
      top: -18px;
      left: 10%;
      width: 80%;
      height: 1px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 1px;
    }

    /* 마우스 올렸을 때 (테마 색상 100% 발현) */
    #category-sidebar .example-folder-btn:hover {
      opacity: 1 !important; /* 쨍하게 만들기 */
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 6px 14px var(--glass-shadow), 0 0 12px var(--glass-base) !important;
      border-color: rgba(255, 255, 255, 0.9) !important;
    }

    /* 클릭(활성화) 되었을 때 */
    #category-sidebar .example-folder-btn.selected {
      opacity: 1 !important;
      transform: scale(1.1);
      box-shadow: 0 0 15px var(--glass-base), 0 6px 15px var(--glass-shadow) !important;
      border-color: #ffffff !important;
    }

    /* 아이콘 흰색 고정 */
    #category-sidebar .example-folder-btn .chip-icon {
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      color: #ffffff; 
    }
    #category-sidebar .example-folder-btn .chip-icon svg {
      width: 100% !important;
      height: 100% !important;
      fill: currentColor !important;
      filter: drop-shadow(0px 1px 2px rgba(0,0,0,0.5));
    }
   
   `
  document.head.appendChild(style)
}

export function parseCssColorToRgba(cssColor: string, alpha: number) {
  if (!cssColor) return `rgba(255,255,255,${alpha})`
  const rgbMatch = cssColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  const rgbaMatch = cssColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/)
  const hexMatch = cssColor.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
  if (rgbaMatch) return `rgba(${rgbaMatch[1]},${rgbaMatch[2]},${rgbaMatch[3]},${alpha})`
  if (rgbMatch) return `rgba(${rgbMatch[1]},${rgbMatch[2]},${rgbMatch[3]},${alpha})`
  if (hexMatch) {
    let hex = hexMatch[1]
    if (hex.length === 3)
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('')
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return `rgba(${r},${g},${b},${alpha})`
  }
  return `rgba(255,255,255,${alpha})`
}

export function decorateToolboxRows() {
  const toolboxDiv = document.querySelector('.blocklyToolboxDiv') as HTMLElement | null
  if (!toolboxDiv) return
  toolboxDiv.style.background = 'transparent'
  toolboxDiv.style.border = 'none'
}

export function scrollSelectedToolboxRowIntoView() {
}