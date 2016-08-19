import preventEventDefault from '../preventEventDefault'

describe('preventDefault() event handler', () => {
  it('prevents the default of the event', () => {
    const func = { callback: a => a }
    const event = { preventDefault: () => {} }

    spyOn(event, 'preventDefault')

    preventEventDefault(func.callback)(event)

    expect(event.preventDefault).toHaveBeenCalled()
  })

  it('calls the callback with the event', () => {
    const func = { callback: a => a }
    const event = { preventDefault: () => {} }

    spyOn(func, 'callback')

    preventEventDefault(func.callback)(event)

    expect(func.callback).toHaveBeenCalledWith(event)
  })
})
